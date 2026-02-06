import { HiArrowPath, HiMiniPhone } from "react-icons/hi2";
import { getExpiryText } from "../../helpers/dateHelpers";
import Modal from "../../ui/Modal";
import MemberForm from "../members/MemberForm";

const formatPlans = {
  "1_month": "1 month",
  "2_month": "2 months",
  "3_month": "3 months",
  "6_month": "6 months",
  "1_year": "1 year",
};

function ExpiringMemberRow({ member }) {
  const { fullName, phone, planType, endDate } = member;
  const { text, urgent } = getExpiryText(endDate);

  return (
    <div className="grid grid-cols-[300px_120px_140px_100px] justify-between items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-white/5 transition-colors">
      {/* Member Info */}
      <div className="flex items-center">
        <div>
          <p className="font-medium">{fullName}</p>
          <p className="text-sm text-text-muted flex items-center gap-1">
            <HiMiniPhone className="text-xs" /> {phone}
          </p>
        </div>
      </div>

      {/* Plan */}
      <span className="text-center px-3 py-1 bg-accent/20 text-accent-hover rounded-full text-sm">
        {formatPlans[planType]}
      </span>

      {/* Expiry status */}
      <span
        className={`text-sm font-medium ${
          urgent ? "text-danger" : "text-warning"
        }`}
      >
        {text}
      </span>

      <Modal>
        <Modal.Open opens="renew">
          <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition-colors">
            <HiArrowPath /> Renew
          </button>
        </Modal.Open>
        <Modal.Window name="renew" title="Renew Membership">
          <MemberForm memberToRenew={member} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default ExpiringMemberRow;
