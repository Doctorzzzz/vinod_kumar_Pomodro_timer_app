"use client";
import React, { useState } from "react";
import { sendResetPasswordEmail } from "../firebase"; 
import Link from "next/link";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendResetPasswordEmail(email); 
      setMessage("Password reset email sent successfully . Please check your email to reset your password.");
    } catch (error: any) {
      setError("Error sending password reset email: " + error.message);
    }
  };

  return (
    <div className="min-h-full h-screen bg-pink-50  flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Your Password
        </h2>
      </div>
      <form className="max-w-md w-full space-y-8" onSubmit={handleResetPassword}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
        <div className="mb-4">
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-5"
            type="submit"
          >
            Reset Password
          </button>
        </div>
        <div className="mb-2 ">
          <Link href={"/login"}className="text-purple-600 hover:text-purple-700 ">
          login Here
          </Link>
        </div>
        {message && <div className="text-green-600">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}

export default ResetPassword;
