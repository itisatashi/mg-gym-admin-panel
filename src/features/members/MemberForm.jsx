import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { calculateEndDate, today } from "../../helpers/dateHelpers";

import { useCreateMember } from "./useCreateMember";
import { useUpdateMember } from "./useUpdateMember";
import { PLAN_TYPES } from "../../helpers/planTypes";

function MemberForm({
  onCloseModal,
  memberToEdit = null,
  memberToRenew = null,
}) {
  const { createNewMember, isCreating } = useCreateMember();
  const { editMember, isUpdating } = useUpdateMember();

  const isEditMode = Boolean(memberToEdit);
  const isRenewMode = Boolean(memberToRenew);
  const isWorking = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: memberToRenew
      ? { ...memberToRenew, startDate: today, endDate: "" }
      : memberToEdit || {
          fullName: "",
          phone: "",
          planType: "",
          startDate: today,
          endDate: "",
        },
  });

  // Watch these to auto-calculate endDate
  const watchPlanType = useWatch({ control, name: "planType" });
  const watchStartDate = useWatch({ control, name: "startDate" });

  // Auto-update endDate when plan or startDate changes
  useEffect(() => {
    if (watchStartDate && watchPlanType) {
      const endDate = calculateEndDate(watchStartDate, watchPlanType);
      setValue("endDate", endDate);
    }
  }, [watchStartDate, watchPlanType, setValue]);

  // Update onFormSubmit
  function onFormSubmit(data) {
    if (isEditMode) {
      editMember(
        { id: memberToEdit.id, data },
        { onSuccess: () => onCloseModal?.() },
      );
    } else if (isRenewMode) {
      editMember(
        { id: memberToRenew.id, data },
        { onSuccess: () => onCloseModal?.() },
      );
    } else {
      createNewMember(data, {
        onSuccess: () => onCloseModal?.(),
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-5">
      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">Full Name *</label>
        <input
          type="text"
          placeholder="Enter member's full name"
          className="input"
          {...register("fullName", { required: "Name is required" })}
          disabled={isWorking}
        />
        {errors.fullName && (
          <span className="text-sm text-danger">{errors.fullName.message}</span>
        )}
      </div>
      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">Phone Number *</label>
        <input
          type="tel"
          placeholder="+998 __ ___ __ __"
          className="input"
          {...register("phone", { required: "Phone is required" })}
          disabled={isWorking}
        />
        {errors.phone && (
          <span className="text-sm text-danger">{errors.phone.message}</span>
        )}
      </div>
      {/* Plan Type */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">Plan Type *</label>
        <select
          className="input"
          {...register("planType", { required: "Please select a plan" })}
          disabled={isWorking}
        >
          {PLAN_TYPES.map((plan) => (
            <option key={plan.value} value={plan.value}>
              {plan.label}
            </option>
          ))}
        </select>
        {errors.planType && (
          <span className="text-sm text-danger">{errors.planType.message}</span>
        )}
      </div>

      {/* Start Date */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">Start Date *</label>
        <input
          type="date"
          className="input"
          {...register("startDate", { required: "Start date is required" })}
          disabled={isWorking}
        />
        {errors.startDate && (
          <span className="text-sm text-danger">
            {errors.startDate.message}
          </span>
        )}
      </div>

      {/* End Date */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">
          End Date (auto-calculated)*
        </label>
        <input
          type="date"
          className="input bg-bg-tertiary cursor-not-allowed"
          {...register("endDate")}
          readOnly
        />
        {errors.startDate && (
          <span className="text-sm text-danger">{errors.endDate.message}</span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <button type="button" onClick={onCloseModal} className="btn-ghost">
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isWorking}>
          {isWorking
            ? "Saving..."
            : isEditMode
              ? "Save Changes"
              : isRenewMode
                ? "Renew Member"
                : "Add Member"}
        </button>
      </div>
    </form>
  );
}

export default MemberForm;
