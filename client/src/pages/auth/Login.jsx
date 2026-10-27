import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useDispatch } from "react-redux";

import BrandMark from "../../components/common/BrandMark";
import { useLogin } from "../../services/query/auth.query";
import { markAuthenticated } from "../../store/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: login, isPending, error } = useLogin();

  const onSubmit = (data) => {
    login(data, {
      onSuccess: () => {
        dispatch(markAuthenticated());
        navigate("/");
      },
    });
  };

  return (
    <div className="grid min-h-screen place-items-center px-4 py-8">
      <div className="w-full max-w-105">
        <div className="mb-6 flex justify-center">
          <BrandMark />
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)] sm:p-8">
          <div className="mb-6 space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-[-0.04em] text-zinc-950">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-500">
              Sign in to continue to your Kingsta feed.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition-colors focus-within:border-zinc-400">
                <Mail className="h-4 w-4 text-zinc-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="w-full border-0 bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                />
              </div>
              {errors.email ? (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition-colors focus-within:border-zinc-400">
                <LockKeyhole className="h-4 w-4 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full border-0 bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="text-zinc-500 transition-colors hover:text-zinc-950"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password ? (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              ) : null}
            </div>

            {error ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error?.response?.data?.message || "Something went wrong"}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Signing in..." : "Log in"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-center text-sm text-zinc-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-zinc-950 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;