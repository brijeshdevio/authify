import { prisma } from "../lib/prisma";

export const userRepo = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  create(data: { email: string; name?: string; passwordHash: string }) {
    return prisma.user.create({ data });
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  updateName(id: string, name: string) {
    return prisma.user.update({ where: { id }, data: { name } });
  },

  updatePassword(id: string, passwordHash: string) {
    return prisma.user.update({ where: { id }, data: { passwordHash } });
  },
};
