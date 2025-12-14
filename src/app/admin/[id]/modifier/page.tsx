import { prisma } from "../../../../../lib/prisma";
import { notFound } from "next/navigation";
import ModificationForm from "./modificationForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const reservation = await prisma.reservation.findUnique({
    where: { id: numericId },
  });

  if (!reservation) {
    notFound();
  }

  return <ModificationForm reservation={reservation} />;
}
