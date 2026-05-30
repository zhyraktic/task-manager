import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.task.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ success: true })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { completed } = await req.json()
  const task = await prisma.task.update({
    where: { id: Number(params.id) },
    data: { completed }
  })
  return NextResponse.json(task)
}