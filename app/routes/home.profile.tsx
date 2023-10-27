import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { GoogleProfile } from "remix-auth-socials";
import Tweet from "~/components/Tweet";
import { remixAuthenticator } from "~/services/auth.server";
import { dbClient } from "~/services/prisma";

export async function loader({ request }: LoaderFunctionArgs) {
  const userSession: GoogleProfile = (await remixAuthenticator.isAuthenticated(
    request,
    {
      failureRedirect: "/",
    }
  )) as GoogleProfile;

  const userData = (
    await dbClient.user.findMany({
      where: {
        Email: userSession.emails[0].value,
      },
    })
  )[0];

  const userFollowers = await dbClient.followers.findMany({
    where: {
      followingID: userData.ID,
    },
  });

  const userFollowing = await dbClient.followers.findMany({
    where: {
      followerID: userData.ID,
    },
  });

  const initialPosts = await dbClient.tweet.findMany({
    where: {
      userID: userData.ID,
    },
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
    userSession,
    initialPosts,
    userFollowers,
    userFollowing,
    userData,
  });
}

export default function Profile() {
  const { userSession, initialPosts, userFollowers, userFollowing, userData } =
    useLoaderData<typeof loader>();
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
            <p className="pt-4 text-xl font-bold">{userData.Name}</p>
            <p>@{userData.Handle}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center pt-10">
        <p>
          <b>{userFollowing.length}</b> Following
        </p>
        <p className="ml-4">
          <b>{userFollowers.length}</b> Followers
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
        {initialPosts.map((initPost) => {
          return <Tweet tweetInformation={initPost} key={initPost.ID} />;
        })}
      </div>
    </section>
  );
}
