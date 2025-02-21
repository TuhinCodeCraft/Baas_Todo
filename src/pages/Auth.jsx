import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-md w-full text-gray-800">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">Welcome to Todo App</h1>
        <p className="mb-6 text-gray-600">Organize your tasks efficiently!</p>

        <SignedOut>
          <SignInButton mode="modal" afterSignInUrl="/home">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" /> <br />
          <button 
            onClick={() => navigate('/home')}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Go to Home
          </button>
        </SignedIn>
      </div>
    </div>
  );
}
