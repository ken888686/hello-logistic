"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();

  switch (status) {
    case "loading":
      return (
        <div className="flex h-dvh w-full flex-col items-center justify-center">
          <p className="mb-4 text-2xl">Loading...</p>
        </div>
      );
    case "authenticated":
      return (
        <div className="flex h-dvh w-full flex-col items-center justify-center">
          <div className="relative mb-4 h-44 w-44">
            <Image
              src={session.user?.image as string}
              fill
              alt=""
              className="rounded-full object-cover"
            />
          </div>
          <p className="mb-2 text-2xl">
            Welcome <span className="font-bold">{session.user?.name}</span>.
          </p>
          <p className="mb-4 font-bold">Signed In As {session.user?.email}</p>
          <button
            className="rounded-md bg-red-600 px-6 py-2"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      );
    case "unauthenticated":
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <p className="mb-2 text-2xl">Not Signed In</p>
          <button
            className="mb-2 rounded-md bg-blue-600 px-6 py-2"
            onClick={() => signIn("google")}
          >
            Sign in with google
          </button>
        </div>
      );
  }
}
