import { prisma } from "../lib/prisma";

export const tokenRepo = {
  create(data: { sessionId: string; tokenHash: string; expiresAt: Date }) {
    return prisma.refreshToken.create({ data });
  },

  findByHash(tokenHash: string) {
    return prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { session: { include: { user: true } } },
    });
  },

  deleteBySessionId(sessionId: string) {
    return prisma.refreshToken.deleteMany({ where: { sessionId } });
  },

  deleteExpired() {
    return prisma.refreshToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  },
};
