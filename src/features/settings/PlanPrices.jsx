import { useForm } from "react-hook-form";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

import Spinner from "../../ui/Spinner";
import { useEffect } from "react";

function PlanPrices() {
  const { settings, isLoading } = useSettings();
  const { saveSettings, isUpdating } = useUpdateSettings();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: settings,
  });

  // Reset form when settings data loads
  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings, reset]);

  if (isLoading) return <Spinner size={60} />;

  function onSubmit(data) {
    saveSettings(data);
  }

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-6">Plan Prices</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* 1 Month */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm text-text-secondary">1 Month</label>
          <input
            type="number"
            className="input flex-1"
            defaultValue={settings?.price_1_month}
            {...register("price_1_month")}
          />
          <span className="text-text-muted">UZS</span>
        </div>

        {/* 2 Months */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm text-text-secondary">2 Months</label>
          <input
            type="number"
            className="input flex-1"
            defaultValue={settings?.price_2_month}
            {...register("price_2_month")}
          />
          <span className="text-text-muted">UZS</span>
        </div>

        {/* 3 Months */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm text-text-secondary">3 Months</label>
          <input
            type="number"
            className="input flex-1"
            defaultValue={settings?.price_3_month}
            {...register("price_3_month")}
          />
          <span className="text-text-muted">UZS</span>
        </div>

        {/* 6 Months */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm text-text-secondary">6 Months</label>
          <input
            type="number"
            className="input flex-1"
            defaultValue={settings?.price_6_month}
            {...register("price_6_month")}
          />
          <span className="text-text-muted">UZS</span>
        </div>

        {/* 1 Year */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm text-text-secondary">1 Year</label>
          <input
            type="number"
            className="input flex-1"
            defaultValue={settings?.price_1_year}
            {...register("price_1_year")}
          />
          <span className="text-text-muted">UZS</span>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="btn-primary mt-4 self-end"
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default PlanPrices;
