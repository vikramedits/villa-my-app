"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  return (
    <section className="container-fluid">
      <div className="bg-gray-950 w-full mx-auto md:max-w-md rounded-xl my-10">
        <div className=" items-center justify-center  space-y-4  px-6 md:px-10 py-4 md:py-10 ">

          {/* <button
            onClick={() => signIn("google")}
            className="px-6 py-3  text-black rounded-lg"
          >
            Login with Google
          </button> */}
          <p className="text-yellow-600 text-2xl md:text-3xl pb-4 md:pb-8 text-center">The Pushpa Heritage, ADMIN!</p>
          {/* GOOGLE LOGIN */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="w-full bg-white text-black rounded-full py-2 "
          >
            Login with Google
          </button>

          <p className="text-white text-center">OR</p>
          <p className="text-white text-center">Login with credentials</p>

          {/* BACKUP LOGIN */}
          <input
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-white bg-white/10 rounded-sm border p-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-white bg-white/10 rounded-sm border p-2"
          />

          <button
            onClick={() =>
              signIn("credentials", {
                email,
                password,
                callbackUrl: "/admin",
              })
            }
            className="w-1/2 block  text-center mx-auto bg-red-500 text-white py-2 rounded "
          >
            Login
          </button>

        </div>
      </div>
    </section>
  );
}
