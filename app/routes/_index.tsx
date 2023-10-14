import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Twitconnect" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main className="flex py-12 px-10 h-screen">
      <div>Welcome to Twitconnect</div>
    </main>
  );
}
