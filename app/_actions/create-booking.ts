"use server";
import { actionClient } from "@/lib/action-client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { returnValidationErrors } from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";

const inputSchema = z.object({
  serviceId: z.string(),
  date: z.date(),
});

export const createBooking = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId, date } }) => {
    console.log("1. Action iniciada", { serviceId, date }); // Veja se isso aparece
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      returnValidationErrors(inputSchema, {
        _errors: ["Unauthorized"],
      });
    }
    console.log("2. Usuário autenticado:", session.user.id);
    const service = await prisma.barbershopService.findUnique({
      where: {
        id: serviceId,
      },
    });
    if (!service) {
      returnValidationErrors(inputSchema, {
        _errors: ["Service not found"],
      });
    }
    console.log("3. Serviço encontrado:", service.name)
    // verificar se já existe agendamento para essa data
    const existingBooking = await prisma.booking.findFirst({
      where: {
        barbershopId: service.barbershopId,
        date,
      },
    });
    if (existingBooking) {
      console.error("Já existe um agendamento para essa data.");
      returnValidationErrors(inputSchema, {
        _errors: ["Já existe um agendamento para essa data."],
      });
    }
    const booking = await prisma.booking.create({
      data: {
        serviceId,
        date,
        userId: session.user.id,
        barbershopId: service.barbershopId,
      },
    });
    console.log("✅ BOOKING CRIADO:", booking);
    return booking;
  });