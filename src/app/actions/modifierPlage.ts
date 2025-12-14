"use server";

import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";

export async function modificationPlage(formData: FormData) {
  console.log("FORM DATA:", Object.fromEntries(formData.entries()));

  const id = Number(formData.get("id"));

  if (!id || Number.isNaN(id)) {
    throw new Error("Invalid reservation ID");
  }

  await prisma.reservation.update({
    where: { id },
    data: {
      nom: formData.get("nom")?.toString() ?? "",
      courriel: formData.get("courriel")?.toString() ?? "",
      marque: formData.get("marque")?.toString() ?? "",
      modele: formData.get("modele")?.toString() ?? "",
      annee: formData.get("annee")?.toString() ?? "",
      plage: new Date(formData.get("plage")!.toString()),
    },
  });

  redirect("/");
}
