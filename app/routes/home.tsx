import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { type GoogleProfile } from "remix-auth-socials";
import Navbar from "~/components/Navbar";
import Recommended from "~/components/Recommended";
import SearchBar from "~/components/SearchBar";
import Sidebar from "~/components/SideBar";
import { remixAuthenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const userSession: GoogleProfile = (await remixAuthenticator.isAuthenticated(
    request
  )) as GoogleProfile;

  return json({
    userSession,
  });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Home" },
    { name: "description", content: "Your Personalized Feed!" },
  ];
};

export default function Index() {
  const { userSession } = useLoaderData<typeof loader>();
  return (
    <main className="grid sm:grid-cols-9 py-5 sm:py-12 px-2 dm:px-0 font-Montserrat">
      <div className="col-span-1 h-full m-2 rounded-xl hidden sm:block">
        <Sidebar userSession={JSON.parse(JSON.stringify(userSession))} />
      </div>
      <div className="sm:hidden">
        <Navbar userSession={JSON.parse(JSON.stringify(userSession))} />
      </div>
      <div className="lg:col-span-5 sm:px-10 sm:col-span-5  h-full m-2 rounded-xl">
        <Outlet />
      </div>
      <div className="col-span-3 h-full m-2 rounded-xl hidden lg:flex flex-col py-4 px-8">
        <SearchBar />
        <Recommended />
      </div>
    </main>
  );
}
