import { userRepo } from "../repos/user.repo";
import { hashPassword, verifyPassword } from "../lib/hash";
import { AppError } from "../errors/AppError";
import type { ChangeNameInput, ChangePasswordInput } from "../validators/user.validator";

export const userService = {
  /**
   * Get the logged-in user's profile.
   */
  async getProfile(userId: string) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },

  /**
   * Update the logged-in user's display name.
   */
  async changeName(userId: string, data: ChangeNameInput) {
    const user = await userRepo.updateName(userId, data.name);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      updatedAt: user.updatedAt,
    };
  },

  /**
   * Change password. Requires current password verification.
   */
  async changePassword(userId: string, data: ChangePasswordInput) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const valid = await verifyPassword(data.currentPassword, user.passwordHash);
    if (!valid) {
      throw new AppError(401, "Current password is incorrect");
    }

    const newHash = await hashPassword(data.newPassword);
    await userRepo.updatePassword(userId, newHash);
  },
};
