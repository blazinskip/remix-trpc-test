import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

const prisma = new PrismaClient();

export const router = t.router({
  addUser: t.procedure
    .input(z.object({ name: z.string().min(3) }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({ data: { email: input.name } });
      return user;
    }),
  findAll: t.procedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),
});
export type AppRouter = typeof router;
