import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patientId, practitionerName, diagnosis, treatment, notes } = body;
    if (!patientId || !practitionerName || !diagnosis) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    // Check if patient exists
    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }
    const record = await prisma.medicalRecord.create({
      data: {
        patientId,
        practitionerName,
        diagnosis,
        treatment,
        notes,
      },
    });
    return NextResponse.json(record, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
} 