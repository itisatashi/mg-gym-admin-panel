import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

function LoginForm() {
  const { loginUser, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    loginUser(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="input"
          disabled={isLoading}
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-sm text-danger">{errors.email.message}</span>
        )}
      </div>

      {/* Passwor */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="input"
          disabled={isLoading}
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-sm text-danger">{errors.password.message}</span>
        )}
      </div>

      <button type="submit" className="btn-primary mt-2" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}

export default LoginForm;
