import { ResultStatus } from "../../../core/types/result.code";
import type { Result } from "../../../core/types/result.type";
import { mapEntityToViewModel } from "../../users/repositories/mappers/users.entity-map";
import { usersRepository } from "../../users/repositories/users.repository";
import type { UserView } from "../../users/types/users.view.type";
import type { LoginSuccessView } from "../types/login.input.type";
import { bcryptService } from "./bcrypt.service";
import { jwtService } from "./jwt.service";

export const authService = {
  async loginUser(
    loginOrEmail: string,
    password: string,
  ): Promise<Result<LoginSuccessView | null>> {
    const { status, data } = await this.checkUserCredentials(
      loginOrEmail,
      password,
    );

    if (!status || data === null) {
      return {
        status: ResultStatus.Forbidden,
        errorMessage: "Credentials is not correct",
        extensions: [],
        data: null,
      };
    }

    const userId = data.id;
    const tokenResult = await jwtService.createToken(userId);

    if (!tokenResult.status || tokenResult.data === null) {
      return {
        status: ResultStatus.Forbidden,
        errorMessage: "Can't create jwt token",
        extensions: [],
        data: null,
      };
    }

    return {
      status: ResultStatus.Success,
      extensions: [],
      data: { accessToken: tokenResult.data },
    };
  },

  async checkUserCredentials(
    loginOrEmail: string,
    password: string,
  ): Promise<Result<UserView | null>> {
    const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
    if (!user)
      return {
        status: ResultStatus.NotFound,
        errorMessage: "User with this redentials is not found",
        extensions: [],
        data: null,
      };

    const checkPassword = await bcryptService.checkPassword(
      password,
      user.password,
    );

    if (!checkPassword) {
      return {
        status: ResultStatus.Forbidden,
        errorMessage: "User password is not correct",
        extensions: [],
        data: null,
      };
    }

    return {
      status: ResultStatus.Success,
      extensions: [],
      data: mapEntityToViewModel(user),
    };
  },
};
