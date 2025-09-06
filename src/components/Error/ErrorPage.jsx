import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center bg-gray-100 px-4">
      <h1 className="text-8xl font-extrabold text-primary mb-6">404</h1>
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-6 max-w-xl">
        Sorry, the page you are looking for doesn’t exist, has been moved, or was never created.
      </p>

      <Link to="/">
        <button className="btn btn-primary flex items-center gap-2">
          <FaHome /> Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
