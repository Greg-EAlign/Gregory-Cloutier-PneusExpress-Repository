import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

const MAX_SPOTS = 3;

async function getSlotsForDay(date: Date) {
  const slots = [];

  for (let hour = 8; hour <= 15; hour++) {
    const start = new Date(date);
    start.setHours(hour, 0, 0, 0);
    const end = new Date(date);
    end.setHours(hour + 1, 0, 0, 0);

    const count = await prisma.reservation.count({
      where: {
        plage: { gte: start, lt: end },
      },
    });

    slots.push({
      hour,
      label: `${hour}–${hour + 1}h`,
      spots: Math.max(MAX_SPOTS - count, 0),
    });
  }

  return slots;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const startParam = url.searchParams.get("start");
  if (!startParam) return NextResponse.json([], { status: 400 });

  const startDate = new Date(startParam);
  const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  const days = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const slots = await getSlotsForDay(date);

    days.push({
      name: weekDays[i],
      date,
      display: date.toLocaleDateString("fr-CA", { day: "numeric", month: "long" }),
      slots,
    });
  }

  return NextResponse.json(days);
}
