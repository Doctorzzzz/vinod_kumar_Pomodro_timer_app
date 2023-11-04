"use client";
import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  AuthError,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsEmailVerified(user.emailVerified);
      }
    });
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleCloseAlerts = () => {
    setError(null);
    setIsAlertVisible(false);
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !confirmPassword) {
      setError("Email, password, and confirm password are required.");
      setTimeout(handleCloseAlerts, 4000);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      setTimeout(handleCloseAlerts, 4000);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        sendEmailVerification(user)
          .then(() => {
            alert("Verification request sent successfully");
          })
          .catch((error: AuthError) => {
            console.error("Error sending email verification:", error);
          });

        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setIsEmailVerified(true);
      } else {
        setError("User is null.");
        setTimeout(handleCloseAlerts, 4000);
      }
    } catch (error: any) {
      setError("Error signing up: " + error.message);
      setTimeout(handleCloseAlerts, 4000);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        if (user.emailVerified) {
          router.push("/");
        } else {
          alert("Please verify your email before signing in.");
        }
      } else {
        setError("User is null.");
        setTimeout(handleCloseAlerts, 4000);
      }
    } catch (error: any) {
      setError("Error signing in: " + error.message);
      setTimeout(handleCloseAlerts, 4000);
    }
  };

  return (
    <div className="min-h-full h-screen flex bg-pink-50 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="flex justify-center">
          <img
            alt=""
            className="h-14 w-14"
            src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Signup to create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 mt-5">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
            Login
          </Link>
        </p>
      </div>
      <form className="max-w-md w-full space-y-8">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-900 p-4 mb-4" role="alert">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-2"
            type="button"
            onClick={handleEmailSignup}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
