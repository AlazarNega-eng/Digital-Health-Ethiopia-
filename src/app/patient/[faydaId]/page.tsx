"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../../components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../../components/ui/accordion";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { User, FileText, Stethoscope, PlusCircle } from "lucide-react";

interface MedicalRecord {
  id: string;
  createdAt: string;
  diagnosis: string;
  notes?: string;
}

interface Patient {
  id: string;
  faydaId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  records: MedicalRecord[];
}

async function getPatient(faydaId: string): Promise<Patient | null> {
  const res = await fetch(`/api/patients/${faydaId}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default function PatientDetailsPage({ params }: { params: { faydaId: string } }) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ diagnosis: "", notes: "", practitionerName: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const router = useRouter();

  // Fetch patient on mount
  useState(() => {
    setLoading(true);
    getPatient(params.faydaId)
      .then((data) => {
        setPatient(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load patient");
        setLoading(false);
      });
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;
    setFormLoading(true);
    setFormError("");
    try {
      const res = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: patient.id,
          practitionerName: form.practitionerName,
          diagnosis: form.diagnosis,
          notes: form.notes,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add record");
      }
      setOpen(false);
      setForm({ diagnosis: "", notes: "", practitionerName: "" });
      router.refresh();
    } catch (err: unknown) {
      let message = "Unknown error";
      if (
        err &&
        typeof err === "object" &&
        "message" in (err as Record<string, unknown>) &&
        typeof (err as Record<string, unknown>).message === "string"
      ) {
        message = (err as Record<string, unknown>).message as string;
      }
      setFormError(message);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error || !patient) return <div className="text-red-500">{error || "Patient not found."}</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10">
      <Card className="p-8 rounded-3xl shadow-xl bg-gradient-to-br from-card to-secondary/40 dark:from-card dark:to-background/60 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-4xl shadow">
          <User className="w-12 h-12" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="text-2xl font-bold text-primary dark:text-primary-foreground">{patient.firstName} {patient.lastName}</div>
          <div className="text-sm text-muted-foreground">Fayda ID: {patient.faydaId}</div>
          <div className="text-sm text-muted-foreground">Date of Birth: {new Date(patient.dateOfBirth).toLocaleDateString()}</div>
        </div>
      </Card>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-primary dark:text-primary-foreground flex items-center gap-2"><FileText className="w-5 h-5" /> Medical Records</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" variant="default"><PlusCircle className="w-5 h-5" /> Add Record</Button>
          </DialogTrigger>
          <DialogContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                name="practitionerName"
                placeholder="Practitioner Name"
                value={form.practitionerName}
                onChange={handleFormChange}
                required
              />
              <Input
                name="diagnosis"
                placeholder="Diagnosis"
                value={form.diagnosis}
                onChange={handleFormChange}
                required
              />
              <Textarea
                name="notes"
                placeholder="Notes"
                value={form.notes}
                onChange={handleFormChange}
              />
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <Button type="submit" disabled={formLoading} className="w-full">
                {formLoading ? "Saving..." : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Accordion type="single" collapsible className="w-full rounded-2xl shadow-lg bg-card/80 dark:bg-background/80">
        {patient.records && patient.records.length > 0 ? (
          patient.records.map((rec) => (
            <AccordionItem key={rec.id} value={rec.id} className="border-b last:border-b-0">
              <AccordionTrigger className="flex items-center gap-3 text-lg font-semibold px-4 py-3 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-xl transition">
                <Stethoscope className="w-5 h-5 text-primary" />
                {new Date(rec.createdAt).toLocaleDateString()} - {rec.diagnosis}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                <div className="text-base">{rec.notes}</div>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <div className="text-muted-foreground p-4">No records found.</div>
        )}
      </Accordion>
    </div>
  );
} 