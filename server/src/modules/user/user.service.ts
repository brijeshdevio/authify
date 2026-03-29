import { prisma } from "../../lib/prisma";
import {
  ForbiddenException,
  UnauthorizedException,
} from "../../utils/exceptions";
import { UpdateDto } from "./user.schema";

export class UserService {
  constructor() {}

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    if (user) return user;

    throw new UnauthorizedException();
  }

  async update(id: string, data: UpdateDto) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (user) return user;

    throw new UnauthorizedException();
  }

  async sessions(id: string) {
    const sessions = await prisma.session.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        expiresAt: true,
        createdAt: true,
      },
    });
    return sessions;
  }

  async session(id: string, sessionId: string) {
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        userId: id,
      },
      select: {
        id: true,
        createdAt: true,
        expiresAt: true,
        ipAddress: true,
        userAgent: true,
      },
    });
    if (session) return session;

    throw new ForbiddenException();
  }
}
