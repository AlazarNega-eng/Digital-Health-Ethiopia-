import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { faydaId, firstName, lastName, dateOfBirth } = body;
    if (!faydaId || !firstName || !lastName || !dateOfBirth) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const patient = await prisma.patient.create({
      data: {
        faydaId,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
      },
    });
    return NextResponse.json(patient, { status: 201 });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in (error as Record<string, unknown>) &&
      (error as Record<string, unknown>).code === "P2002"
    ) {
      return NextResponse.json({ error: "Patient with this Fayda ID already exists" }, { status: 409 });
    }
    const message = error && typeof error === "object" && "message" in (error as Record<string, unknown>) && typeof (error as Record<string, unknown>).message === "string"
      ? (error as Record<string, unknown>).message as string
      : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(patients);
} 