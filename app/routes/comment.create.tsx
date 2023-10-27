import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { dbClient } from "~/services/prisma";

export async function action({ request }: ActionFunctionArgs) {
  const jsonData = await request.json();

  await dbClient.replies.create({
    data: {
      Content: jsonData.Content,
      tweetID: jsonData.tweetID,
      userID: jsonData.userID,
    },
  });

  return redirect("/home", {
    status: 302,
  });
}
