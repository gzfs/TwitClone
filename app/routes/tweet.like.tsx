import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { dbClient } from "~/services/prisma";

export async function action({ request }: ActionFunctionArgs) {
  const jsonData = await request.json();

  await dbClient.likes.create({
    data: {
      tweetID: jsonData.tweetID as string,
      userID: jsonData.userID as string,
    },
  });

  return redirect("/home", {
    status: 302,
  });
}
