import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import PostTweet from "~/components/PostTweet";
import Tweet from "~/components/Tweet";
import { dbClient } from "~/services/prisma";

export async function loader() {
  const initialPosts = await dbClient.tweet.findMany({
    include: {
      Replies: {
        include: {
          User: true,
        },
      },
      User: true,
      Likes: true,
    },
  });

  return json({
    initialPosts,
  });
}

export default function Tweets() {
  const { initialPosts } = useLoaderData<typeof loader>();

  return (
    <>
      <PostTweet />
      {initialPosts.map((initPost) => {
        return <Tweet tweetInformation={initPost} key={initPost.ID} />;
      })}
    </>
  );
}
