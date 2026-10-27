import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  CalendarDays,
  Eye,
  EyeOff,
  FileText,
  Hash,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import BrandMark from "../../components/common/BrandMark";
import { useRegister } from "../../services/query/auth.query";
import { markAuthenticated } from "../../store/slices/authSlice";

const Field = ({ label, icon: Icon, placeholder, register, name, rules, error }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-700">{label}</label>
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition-colors focus-within:border-zinc-400">
        <Icon className="h-4 w-4 text-zinc-400" />
        <input
          type={name === "email" ? "email" : name === "dob" ? "date" : "text"}
          placeholder={placeholder}
          autoComplete={name}
          {...register(name, rules)}
          className="w-full border-0 bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
        />
      </div>
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      bio: "",
      dob: "",
    },
  });

  const { mutate: registerUser, isPending, error } = useRegister();

  const onSubmit = (data) => {
    registerUser(data, {
      onSuccess: () => {
        dispatch(markAuthenticated());
        navigate("/");
      },
    });
  };

  return (
    <div className="grid min-h-screen place-items-center px-4 py-8">
      <div className="w-full max-w-140">
        <div className="mb-6 flex justify-center">
          <BrandMark />
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)] sm:p-8">
          <div className="mb-6 space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-[-0.04em] text-zinc-950">
              Create your account
            </h1>
            <p className="text-sm text-zinc-500">
              Join Kingsta and start sharing moments.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Username"
                icon={Hash}
                placeholder="yourusername"
                register={register}
                name="username"
                error={errors.username?.message}
                rules={{ required: "Username is required" }}
              />

              <Field
                label="Full name"
                icon={UserRound}
                placeholder="Your full name"
                register={register}
                name="fullName"
                error={errors.fullName?.message}
                rules={{ required: "Full name is required" }}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Email"
                icon={Mail}
                placeholder="you@example.com"
                register={register}
                name="email"
                error={errors.email?.message}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                }}
              />

              <Field
                label="Mobile"
                icon={Phone}
                placeholder="10 digit mobile number"
                register={register}
                name="mobile"
                error={errors.mobile?.message}
                rules={{
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10 digit mobile number",
                  },
                }}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition-colors focus-within:border-zinc-400">
                <LockKeyhole className="h-4 w-4 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
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

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Bio
              </label>
              <div className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition-colors focus-within:border-zinc-400">
                <FileText className="mt-0.5 h-4 w-4 text-zinc-400" />
                <textarea
                  rows={3}
                  placeholder="A short bio for your profile"
                  {...register("bio")}
                  className="w-full resize-none border-0 bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Date of birth
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition-colors focus-within:border-zinc-400">
                <CalendarDays className="h-4 w-4 text-zinc-400" />
                <input
                  type="date"
                  {...register("dob")}
                  className="w-full border-0 bg-transparent text-sm text-zinc-950 outline-none"
                />
              </div>
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
              {isPending ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-zinc-950 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;