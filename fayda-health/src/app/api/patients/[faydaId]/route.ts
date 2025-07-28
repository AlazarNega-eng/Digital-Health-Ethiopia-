import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { faydaId: string } }) {
  const { faydaId } = params;
  if (!faydaId) {
    return NextResponse.json({ error: "Fayda ID is required" }, { status: 400 });
  }
  const patient = await prisma.patient.findUnique({
    where: { faydaId },
    include: { records: true },
  });
  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }
  return NextResponse.json(patient);
} 