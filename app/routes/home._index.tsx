import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import PostTweet from "~/components/PostTweet";
import Tweet from "~/components/Tweet";

export async function loader() {
  return json({
    initialPosts: [
      {
        postComments: [{}],
        postContent:
          "Javascript Sucks. Dart is the new thing. I need Monads in Javascript",
        postLikes: 20,
        postSeconds: 40,
        postUser: "Vishal Murugan",
        postImage:
          "https://images.unsplash.com/photo-1685825631222-6bfdc760d39c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      },
    ],
  });
}

export default function Tweets() {
  const { initialPosts } = useLoaderData<typeof loader>();
  const [initPosts, setInitPosts] = useState(initialPosts);
  return (
    <>
      <PostTweet />
      {initPosts.map((initPost) => {
        return (
          <Tweet
            postComments={initPost.postComments}
            postContent={initPost.postContent}
            postLikes={initPost.postLikes}
            postSeconds={initPost.postSeconds}
            postUser={initPost.postUser}
            postImage={initPost.postImage}
          />
        );
      })}
    </>
  );
}
