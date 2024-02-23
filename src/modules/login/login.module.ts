import { Module, forwardRef } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { Passport } from "passport";
import { JwtModule } from "@nestjs/jwt";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    forwardRef(()=>UsersModule),
    Passport,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
})
export class LoginModule {}
