import { useForm } from "react-hook-form";
import { useCreateStaff } from "./useCreateStaff";

function AddStaffForm({ onCloseModal }) {
  const { createStaff, isCreating } = useCreateStaff();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    createStaff(data, {
      onSuccess: () => onCloseModal?.(),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">Full Name</label>
        <input
          type="text"
          placeholder="Enter staff name"
          className="input"
          disabled={isCreating}
          {...register("fullName", { required: "Name is required" })}
        />
        {errors.fullName && (
          <span className="text-sm text-danger">{errors.fullName.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">Email</label>
        <input
          type="email"
          placeholder="staff@mggym.uz"
          className="input"
          disabled={isCreating}
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-sm text-danger">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">Password</label>
        <input
          type="password"
          placeholder="Create password for staff"
          className="input"
          disabled={isCreating}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Min 6 characters" },
          })}
        />
        {errors.password && (
          <span className="text-sm text-danger">{errors.password.message}</span>
        )}
      </div>

      {/* Submit */}
      <button type="submit" className="btn-primary" disabled={isCreating}>
        {isCreating ? "Creating..." : "Create Staff Account"}
      </button>
    </form>
  );
}

export default AddStaffForm;
