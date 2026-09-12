import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  LockKeyhole,
  Workflow,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";


function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await register({
        name,
        email,
        password,
      });

      navigate("/");

    } catch (error: any) {

      setError(
        error.response?.data?.detail ||
        "Registration failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="flex flex-col items-center mb-8">

          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-4">

            <Workflow
              size={30}
              className="text-white"
            />

          </div>

          <h1 className="text-3xl font-bold text-white">
            FlowSync
          </h1>

          <p className="text-slate-400 mt-2 text-center">
            Create your account and get started
          </p>

        </div>


        {/* Register Card */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Create Account
          </h2>


          {error && (

            <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">

              {error}

            </div>

          )}


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Your name"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500"
                />

              </div>

            </div>


            {/* Email */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500"
                />

              </div>

            </div>


            {/* Password */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Create a password"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500"
                />

              </div>

            </div>


            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition"
            >

              {loading
                ? "Creating account..."
                : "Create Account"
              }

            </button>

          </form>


          {/* Login Link */}

          <p className="text-center text-sm text-slate-400 mt-6">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-blue-400 hover:text-blue-300"
            >
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}


export default Register;