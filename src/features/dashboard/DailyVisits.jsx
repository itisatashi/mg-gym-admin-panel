import { useState } from "react";
import { HiTicket, HiPlus, HiTrash } from "react-icons/hi2";

import { useTodayVisits } from "./useTodayVisits";
import { useCreateDailyVisit } from "./useCreateDailyVisit";
import { useDeleteDailyVisit } from "./useDeleteDailyVisit";
import { useSettings } from "../settings/useSettings";

import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDialog from "../../ui/ConfirmDialog";

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DayPassForm({ onCloseModal }) {
  const { settings, isLoading } = useSettings();
  const { addVisit, isCreating } = useCreateDailyVisit();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const dailyPrice = settings?.price_daily_pass || 25000;

  function handleSubmit(e) {
    e.preventDefault();
    addVisit(
      {
        name: name || null,
        phone: phone || null,
        amount: Number(dailyPrice),
      },
      { onSuccess: () => onCloseModal?.() },
    );
  }

  if (isLoading) return <Spinner size={20} />;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">
          Name <span className="text-text-muted">(optional)</span>
        </label>
        <input
          type="text"
          placeholder="Walk-in visitor name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isCreating}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">
          Phone <span className="text-text-muted">(optional)</span>
        </label>
        <input
          type="tel"
          placeholder="+998 __ ___ __ __"
          className="input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isCreating}
        />
      </div>

      <div className="p-4 bg-white/5 rounded-xl text-center">
        <p className="text-sm text-text-muted">Day Pass Price</p>
        <p className="text-xl font-bold text-green-400">
          {Number(dailyPrice).toLocaleString()} UZS
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <button type="button" onClick={onCloseModal} className="btn-ghost">
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isCreating}>
          {isCreating ? "Logging..." : "Log Day Pass"}
        </button>
      </div>
    </form>
  );
}

function DailyVisits() {
  const { visits, isLoading } = useTodayVisits();
  const { removeVisit, isDeleting } = useDeleteDailyVisit();

  if (isLoading) return <Spinner size={60} />;

  const todayCount = visits?.length || 0;
  const todayRevenue =
    visits?.reduce((sum, v) => sum + (v.amount || 25000), 0) || 0;

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <HiTicket className="text-xl text-orange-400" />
          </div>
          <div>
            <h2 className="font-semibold">Day Passes</h2>
            <p className="text-sm text-text-muted">
              Today: {todayCount} visits • {todayRevenue.toLocaleString()} UZS
            </p>
          </div>
        </div>

        <Modal>
          <Modal.Open opens="add-day-pass">
            <button className="btn-primary text-sm flex items-center gap-2">
              <HiPlus /> Day Pass
            </button>
          </Modal.Open>
          <Modal.Window name="add-day-pass" title="Log Day Pass">
            <DayPassForm />
          </Modal.Window>
        </Modal>
      </div>

      {/* Visits List */}
      {todayCount === 0 ? (
        <div className="p-8 text-center text-text-muted">
          No day passes today
        </div>
      ) : (
        <div className="max-h-64 overflow-y-auto">
          {visits.map((visit) => (
            <div
              key={visit.id}
              className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-orange-500 to-amber-400 flex items-center justify-center font-semibold text-sm">
                  {visit.name ? visit.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <p className="font-medium">{visit.name || "Walk-in"}</p>
                  <p className="text-xs text-text-muted">
                    {formatTime(visit.created_at)}
                    {visit.phone && ` • ${visit.phone}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-green-400">
                  {(visit.amount || 25000).toLocaleString()} UZS
                </span>

                <Modal>
                  <Modal.Open opens="delete-visit">
                    <button
                      className="p-2 hover:bg-white/10 rounded-lg text-text-muted hover:text-danger transition-colors"
                      disabled={isDeleting}
                    >
                      <HiTrash />
                    </button>
                  </Modal.Open>
                  <Modal.Window name="delete-visit" title="Remove Day Pass">
                    <ConfirmDialog
                      title="Remove"
                      message={`Remove day pass for "${visit.name || "Walk-in"}"?`}
                      confirmText="Remove"
                      onConfirm={() => removeVisit(visit.id)}
                    />
                  </Modal.Window>
                </Modal>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DailyVisits;
