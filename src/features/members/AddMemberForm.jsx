import Modal from "../../ui/Modal";
import MemberForm from "./MemberForm";

function AddMemberForm() {
  return (
    <Modal>
      <Modal.Open opens="add-member">
        <button className="btn-primary">+ Add Member</button>
      </Modal.Open>
      <Modal.Window name="add-member" title="Add New Member">
        <MemberForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddMemberForm;
