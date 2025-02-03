import { PassportStatic } from "passport";
import CONFIG from "../constants/config.constants.ts";
import { UserModel, UserFromToken } from "../models/user.model.ts";
import {
  Strategy as JwtStrategy,
  ExtractJwt as ExtractJwt,
  StrategyOptionsWithSecret,
} from "passport-jwt";

const opts: StrategyOptionsWithSecret = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: CONFIG.JWT_SECRET,
};

export default function Passport(passport: PassportStatic) {
  const strategy = new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user: UserFromToken | null = await UserModel.findOne({
        id: jwt_payload.sub,
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error: unknown) {
      console.log(error);
      return done(null, false);
    }
  });

  return passport.use(strategy);
}
