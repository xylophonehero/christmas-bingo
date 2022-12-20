import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Auth from "../components/Auth";
import Link from "next/link";
import { FiHome } from "react-icons/fi";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <header className="flex justify-between items-center gap-2 px-4 py-3">
        <Link href="/">
          <FiHome />
        </Link>
        <Auth />
      </header>
      <main className="flex flex-col items-center justify-center flex-1">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
