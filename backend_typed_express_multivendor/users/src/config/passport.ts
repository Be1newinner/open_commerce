import { PassportStatic } from "passport";
import CONFIG from "../constants/config.constants.ts";
import { UserModel } from "./../models/user.model.ts";
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
  return passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      UserModel.findOne({ id: jwt_payload.sub }, function (err: unknown, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
}
