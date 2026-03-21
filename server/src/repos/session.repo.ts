import { prisma } from "../lib/prisma";

export const sessionRepo = {
  create(data: {
    userId: string;
    userAgent?: string;
    ipAddress?: string;
    expiresAt: Date;
  }) {
    return prisma.session.create({ data });
  },

  findById(id: string) {
    return prisma.session.findUnique({
      where: { id },
      include: { user: true },
    });
  },

  deleteById(id: string) {
    return prisma.session.delete({ where: { id } });
  },

  deleteAllForUser(userId: string) {
    return prisma.session.deleteMany({ where: { userId } });
  },

  findAllForUser(userId: string) {
    return prisma.session.findMany({
      where: { userId, expiresAt: { gt: new Date() } },
      select: {
        id: true,
        userAgent: true,
        ipAddress: true,
        createdAt: true,
        expiresAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
