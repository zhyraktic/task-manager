import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.task.delete({ where: { id: Number(id) } })
  return NextResponse.json({ success: true })
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { completed } = await req.json()
  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: { completed }
  })
  return NextResponse.json(task)
}