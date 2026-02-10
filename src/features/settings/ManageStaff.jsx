import { HiTrash, HiUserPlus } from "react-icons/hi2";
import { useStaff } from "./useStaff";
import { useDeleteStaff } from "./useDeleteStaff";

import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDialog from "../../ui/ConfirmDialog";
import AddStaffForm from "./AddStaffForm";

function ManageStaff() {
  const { staff, isLoading } = useStaff();
  const { deleteStaff, isDeleting } = useDeleteStaff();

  if (isLoading) return <Spinner size={60} />;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Manage Staff</h2>

        <Modal>
          <Modal.Open opens="add-staff">
            <button className="btn-primary text-sm flex items-center gap-2">
              <HiUserPlus /> Add Staff
            </button>
          </Modal.Open>
          <Modal.Window name="add-staff" title="Add New Staff">
            <AddStaffForm />
          </Modal.Window>
        </Modal>
      </div>

      {/* Staff List */}
      {staff?.length === 0 ? (
        <p className="text-text-muted text-center py-4">No staff members yet</p>
      ) : (
        <div className="flex flex-col gap-3">
          {staff?.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-500 to-emerald-400 flex items-center justify-center font-semibold text-sm">
                  {person.full_name?.charAt(0) ||
                    person.email?.charAt(0) ||
                    "S"}
                </div>

                {/* Info */}
                <div>
                  <p className="font-medium">
                    {person.fullName || "Staff Member"}
                  </p>
                  <p className="text-sm text-text-muted">{person.email}</p>
                </div>
              </div>

              {/* Delete Button */}
              <Modal>
                <Modal.Open opens="delete-staff">
                  <button
                    className="p-2 hover:bg-white/10 rounded-lg text-text-muted hover:text-danger transition-colors"
                    disabled={isDeleting}
                  >
                    <HiTrash className="text-xl" />
                  </button>
                </Modal.Open>

                <Modal.Window name="delete-staff" title="Remove Staff">
                  <ConfirmDialog
                    title="Remove Staff"
                    message={`Are you sure you want to remove "${
                      person.fullName || person.email
                    }"? They will no longer be able to access the admin panel.`}
                    confirmText="Remove"
                    onConfirm={() => deleteStaff(person.id)}
                  />
                </Modal.Window>
              </Modal>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageStaff;
