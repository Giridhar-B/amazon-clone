import React from "react";
import { useNavigate } from "react-router-dom";

function SignInPanel() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-center py-6 mt-10 border-t border-b border-gray-300">
        <hr />
      <h2 className=" mt-8 font-bold text-[24px]">See personalized recommendations</h2>
      <button
        onClick={() => navigate("/signin")}
        className="mt-2 w-[250px] px-16 py-1 bg-yellow-400 hover:bg-yellow-500 text-black rounded-2xl"
      >
        Sign in
      </button>
      <p className="text-[11px] mt-1">
        New customer?{" "}
        <a href="/signup" className="text-blue-600 underline hover:text-blue-950">
          Start here.
        </a>
      </p>
      <hr className="mt-4"/>
    </div>
  );
}

export default SignInPanel;
