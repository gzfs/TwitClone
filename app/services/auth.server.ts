import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { GoogleStrategy } from "remix-auth-socials";
import { dbClient } from "./prisma";

export const remixAuthenticator = new Authenticator(sessionStorage);

remixAuthenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: ["email", "openid", "profile"],
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async ({ profile }) => {

      await dbClient.user.upsert({
        where: {
          Email: profile.emails[0].value,
        },
        create: {
          isPrivate: false,
          Email: profile.emails[0].value,
          Handle: profile.emails[0].value.split("@")[0],
          Name: profile.displayName,
          Image: profile.photos[0].value
        },
        update: {

        }
      })

      return profile;
    }
  )
);
