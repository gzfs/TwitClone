import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { GoogleProfile } from "remix-auth-socials";
import { remixAuthenticator } from "~/services/auth.server";
import { dbClient } from "~/services/prisma";

export async function action({ request }: ActionFunctionArgs) {
  const userSession: GoogleProfile = (await remixAuthenticator.isAuthenticated(
    request
  )) as GoogleProfile;

  const jsonData = await request.json();

  const theUser = (
    await dbClient.user.findMany({
      where: {
        Email: userSession.emails[0].value,
      },
    })
  )[0];

  console.log(theUser);

  await dbClient.tweet.create({
    data: {
      CreatedAt: new Date(),
      Content: jsonData.postText,
      userID: theUser.ID,
      Image: jsonData.imageUrl ? jsonData.imageUrl : "",
    },
  });
  return redirect("/home", {
    status: 302,
  });
}
