import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Auth from "../components/Auth";
import Link from "next/link";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <header className="flex justify-between items-center gap-2 px-4 py-3">
        <Link href="/">
          <span className="text-brand font-bold text-lg">
            Christams Bingo
          </span>
        </Link>
        <Auth />
      </header>
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <footer className="py-4" />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
