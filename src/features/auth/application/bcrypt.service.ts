import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants/hash.constants";

export const bcryptService = {
  async generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  },

  async checkPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  },
};
