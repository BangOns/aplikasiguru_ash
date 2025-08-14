import type { DateType } from "@/types/date";

export function getWeekDates(offset: number = 0) {
  const today = new Date();

  // Geser minggu sesuai offset (0 = minggu ini, -1 = minggu lalu, 1 = minggu depan)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + offset * 7);

  const weekDates: DateType[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);

    weekDates.push({
      dayName: currentDate.toLocaleDateString("id-ID", { weekday: "long" }),
      date: currentDate.getDate(),
      month: currentDate.toLocaleDateString("id-ID", { month: "long" }),
      year: currentDate.getFullYear(),
      fullDate: currentDate.toISOString().split("T")[0], // format YYYY-MM-DD
    });
  }

  return weekDates;
}
