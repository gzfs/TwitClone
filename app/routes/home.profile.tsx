import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { GoogleProfile } from "remix-auth-socials";
import Tweet from "~/components/Tweet";
import { remixAuthenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const userSession: GoogleProfile = (await remixAuthenticator.isAuthenticated(
    request,
    {
      failureRedirect: "/",
    }
  )) as GoogleProfile;

  return json({
    userSession,
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

export default function Profile() {
  const { userSession, initialPosts } = useLoaderData<typeof loader>();
  const [initPosts, setInitPosts] = useState(initialPosts);
  return (
    <section className="text-[#5a3434] font-Montserrat py-10 px-5 sm:py-0 sm:px-0">
      <p className="text-5xl font-bold pb-10">Profile</p>
      <div className="grid grid-cols-3 place-content-center place-items-end">
        <div className="flex w-full col-span-2">
          <img
            src={userSession.photos[0].value}
            alt="Profile"
            className="rounded-full"
          />
          <div className="ml-4">
            <p className="pt-4 text-xl font-bold">{userSession.displayName}</p>
            <p>@gzfs</p>
          </div>
        </div>
        <div className="bg-[#333333] px-8 py-4 rounded-full text-white text-xs">
          Edit Profile
        </div>
      </div>
      <div className="flex items-center pt-10">
        <p>
          <b>69</b> Following
        </p>
        <p className="ml-4">
          <b>420</b> Followers
        </p>
      </div>
      <div className="grid grid-cols-4 gap-x-4 py-6">
        <div className="bg-[#333333] w-full text-center py-3 rounded-full text-white text-xs">
          Posts
        </div>
        <div className="border border-[#333333] w-full text-center py-3 rounded-full text-[#333333] text-xs">
          Replies
        </div>
        <div className="border border-[#333333] w-full text-center py-3 rounded-full text-[#333333] text-xs">
          Likes
        </div>
        <div className="border border-[#333333] w-full text-center py-3 rounded-full text-[#333333] text-xs">
          Media
        </div>
      </div>
      <div>
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
      </div>
    </section>
  );
}
