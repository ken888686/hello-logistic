"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function MainHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="relative flex h-10 items-center bg-gray-100 px-4 shadow-md">
      <Link href="/" className="text-xl font-bold">
        Hello
      </Link>
      <nav className="absolute flex w-full items-center justify-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
        </ul>
      </nav>
      <div className="ml-auto">
        {status === "loading" ? (
          <span>Loading...</span>
        ) : session ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => signOut()}
              className="rounded bg-red-500 px-3 py-1 text-white"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="rounded bg-blue-500 px-3 py-1 text-white"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}
