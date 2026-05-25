"use client";
import { usePathname, useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  if (pathname === "/account/login") {
    return null;
  }

  return (
    <nav className="bg-white border-gray-200 shadow shrink-0 p-4 sticky top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <a
          href="/user-requirement"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary">
            Itera-Web-Q
          </span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {session ? (
            <div className="text-neutral flex items-center space-x-4 rtl:space-x-reverse">
              <p>Welcome, {session.user?.email?.split("@")[0]}</p>
              <button
                type="button"
                className="btn btn-outline btn-primary"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => router.push("/account/login")}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
