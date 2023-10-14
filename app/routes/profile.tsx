import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { GoogleProfile } from "remix-auth-socials";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/SideBar";
import { remixAuthenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const userSession: GoogleProfile =
    (await remixAuthenticator.isAuthenticated(
      request
    )) as GoogleProfile;

  return json({
    userSession,
  });
}

export default function Profile() {
  const { userSession } = useLoaderData<typeof loader>();
  return (
    <section className="grid sm:grid-cols-9 py-5 sm:py-12 px-2 dm:px-0 font-Montserrat">
      <div className="col-span-1 h-full m-2 rounded-xl hidden sm:block">
        <Sidebar userSession={userSession} />
      </div>
      <div className="sm:hidden">
        <Navbar userSession={userSession} />
      </div>
    </section>
  );
}
