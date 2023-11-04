"use client";
import React, { useState } from "react";

import {
  
  signInWithEmailAndPassword,
  signInWithPopup,
  
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, provider } from "../firebase";
import Link from "next/link";

function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        if (user && user.emailVerified) {
          router.push("/");
        } else {
          alert("Please verify your email before signing in.");
        }
      });
    } catch (error: any) {
      console.error("Error signing in:", error);
      alert("User record not found");
    }
  };

  const handleGoogleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user && user.emailVerified) {
          router.push("/");
        } else {
          alert("Please verify your email before signing in.");
        }
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };

  return (
    <div className="min-h-full h-screen bg-pink-50  flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

         <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-14"
                    src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            Don't have an account yet? {' '}
            <Link href={"/signup"} className="font-medium text-purple-600 hover:text-purple-500">
                Sign up
            </Link>
            </p>
        </div>
      <form className="max-w-md w-full space-y-8">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-2 ">
          <Link href={"/reset"}className="text-purple-600 hover:text-purple-500 ">
          Forgot your password?
          </Link>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-2"
            type="button"
            onClick={handleEmailLogin}
          >
            Sign In
          </button>
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-2"
            type="button"
            onClick={handleGoogleLogin}
          >
            Sign In with Google
          </button>
        </div>

        
      </form>
    </div>
  );
}

export default LoginPage;
