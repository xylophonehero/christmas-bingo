import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";

const Auth: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex items-center justify-end gap-4">
      <p className="">
        {sessionData && <span>{sessionData.user?.name}</span>}
      </p>
      <Button
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};

export default Auth