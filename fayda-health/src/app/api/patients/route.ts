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
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Patient with this Fayda ID already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
} 