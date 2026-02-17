import { HiArrowPath, HiPencil, HiTrash } from "react-icons/hi2";

import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import MemberForm from "./MemberForm";
import ConfirmDialog from "../../ui/ConfirmDialog";

import { useDeleteMember } from "./useDeleteMember";
import { calculateStatus } from "../../helpers/dateHelpers";
import { getMonthsFromPlanWithLabel } from "../../helpers/planTypes";

function MemberRow({ member }) {
  const { id, fullName, phone, planType, startDate, endDate } = member;

  const { removeMember, isDeleting } = useDeleteMember();

  function handleDelete() {
    removeMember(id);
  }

  const initial = fullName.charAt(0).toUpperCase();

  // Calculate a member's days until his endDate
  const status = calculateStatus(endDate);

  // Status
  const statusClass = {
    active: "badge-success",
    expiring: "badge-warning",
    expired: "badge-danger",
  }[status];

  return (
    <tr className="border-b border-border hover:bg-white/5 transition-colors">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-accent to-cyan-400 flex items-center justify-center font-semibold text-sm">
            {initial}
          </div>
          <span className="font-medium">{fullName}</span>
        </div>
      </td>

      <td className="p-4 text-text-secondary">{phone}</td>
      <td className="p-4">
        <span className="px-3 py-1 bg-accent/20 text-accent-hover rounded-full text-sm">
          {getMonthsFromPlanWithLabel(planType)}
        </span>
      </td>
      <td className="p-4 text-text-secondary">{startDate}</td>
      <td className="p-4 text-text-secondary">{endDate}</td>
      <td className="p-4">
        <span className={statusClass}>{status}</span>
      </td>
      <td className="p-4">
        <Modal>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            {/* Edit - opens modal */}
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>

            {/* Renew - new! */}
            {status === "expired" && (
              <Modal.Open opens="renew">
                <Menus.Button icon={<HiArrowPath />}>Renew Plan</Menus.Button>
              </Modal.Open>
            )}

            {/* Delete */}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} danger={true}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>

          {/* Edit Modal Window */}
          <Modal.Window name="edit" title="Edit Member">
            <MemberForm memberToEdit={member} />
          </Modal.Window>

          {/* Renew Modal - just select new plan */}
          <Modal.Window name="renew" title="Renew Membership">
            <MemberForm memberToRenew={member} />
          </Modal.Window>

          {/* Delete Modal Window */}
          <Modal.Window name="delete" title="Delete Member">
            <ConfirmDialog
              title="Delete"
              message={`Are you sure you want to delete "${fullName}"? This action cannot be undone.`}
              confirmText="Delete"
              onConfirm={handleDelete}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </td>
    </tr>
  );
}

export default MemberRow;
