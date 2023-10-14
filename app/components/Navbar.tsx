import { Form, Link } from "@remix-run/react";
import SearchBar from "./SearchBar";
import { type SVGProps } from "react";
import { type GoogleProfile } from "remix-auth-socials";

export function IcBaselineAccountCircle(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"
      ></path>
    </svg>
  );
}

export default function Navbar({
  userSession,
}: {
  userSession: GoogleProfile;
}) {
  return (
    <div className="grid grid-cols-6 place-content-center place-items-center gap-x-4">
      <div className="col-span-1">
        <Link to="/">
          <img
            src="/assets/images/Twitter.png"
            width="30px"
            alt="Twitter"
          />
        </Link>
      </div>
      <div className="col-span-4">
        <SearchBar />
      </div>
      {!userSession ? (
        <Form
          action="/auth/google"
          method="POST"
          className="w-fit col-span-1 h-fit mt-2"
        >
          <button>
            <IcBaselineAccountCircle
              color="#ff5f7a"
              className="text-4xl"
            />
          </button>
        </Form>
      ) : (
        <Form
          action="/auth/logout"
          method="POST"
          className="col-span-1 h-fit mt-2"
        >
          <button className="h-fit">
            <img
              src={userSession.photos[0].value}
              alt="Profile"
              width={32}
              className="rounded-full"
            />
          </button>
        </Form>
      )}
    </div>
  );
}
