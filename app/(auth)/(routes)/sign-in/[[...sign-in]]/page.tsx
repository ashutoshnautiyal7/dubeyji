import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      Welcome to the sign in page
      <div></div>
      <SignIn />
    </div>
  );
}
