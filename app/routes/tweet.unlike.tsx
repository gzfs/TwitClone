import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { dbClient } from "~/services/prisma";

export async function action({ request }: ActionFunctionArgs) {
  const jsonData = await request.json();

  await dbClient.likes.delete({
    where: {
      likeIdentifier: {
        tweetID: jsonData.tweetID,
        userID: jsonData.userID,
      },
    },
  });

  return redirect("/home", {
    status: 302,
  });
}
