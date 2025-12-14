"use server";

import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";

export async function ajoutPlage(formData: FormData) {
  const nom = formData.get("nom")?.toString() || "";
  const courriel = formData.get("courriel")?.toString() || "";
  const marque = formData.get("marque")?.toString() || "";
  const annee = formData.get("annee")?.toString() || "";
  const modele = formData.get("modele")?.toString() || "";

  const plage = new Date(formData.get("plage")!.toString());

  await prisma.reservation.create({
    data: {
      nom,
      courriel,
      marque,
      annee,
      modele,
      plage,
    },
  });

  redirect("/");
}
