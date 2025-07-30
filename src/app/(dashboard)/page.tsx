"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { User, Search } from "lucide-react";

// Patient type
interface Patient {
  faydaId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export default function DashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filtered, setFiltered] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/patients")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch patients");
        return res.json();
      })
      .then((data) => {
        setPatients(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(patients);
    } else {
      setFiltered(
        patients.filter(
          (p) =>
            p.faydaId.toLowerCase().includes(search.toLowerCase()) ||
            p.firstName.toLowerCase().includes(search.toLowerCase()) ||
            p.lastName.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, patients]);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-primary dark:text-primary-foreground tracking-tight">Patient Search</h1>
          <p className="text-muted-foreground text-base">Find patients by Fayda ID or name. Click a card to view details.</p>
        </div>
        <form className="flex gap-2 items-center bg-card rounded-xl shadow px-4 py-2 border border-border w-full md:w-auto" onSubmit={e => e.preventDefault()}>
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Enter Fayda ID or patient name..."
            className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button type="submit" className="ml-2">Search</Button>
        </form>
      </div>
      <h2 className="text-xl font-semibold mb-4 text-primary dark:text-primary-foreground">Recent Patients</h2>
      {loading && <div className="text-center py-8">Loading...</div>}
      {error && <div className="text-red-500 py-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && !error && filtered.length === 0 && <div className="col-span-full text-center text-muted-foreground">No patients found.</div>}
        {filtered.map((p) => (
          <Link key={p.faydaId} href={`/patient/${p.faydaId}`}>
            <Card className="group p-6 cursor-pointer rounded-2xl shadow-lg border border-border bg-gradient-to-br from-card to-secondary/40 dark:from-card dark:to-background/60 hover:scale-[1.03] hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-bold text-lg text-primary dark:text-primary-foreground group-hover:underline">{p.firstName} {p.lastName}</div>
                  <div className="text-xs text-muted-foreground">Fayda ID: {p.faydaId}</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">DOB: {new Date(p.dateOfBirth).toLocaleDateString()}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 