import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";

const App = ({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SessionProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}

export default trpc.withTRPC(App)