import { IoIosClose } from "react-icons/io";

interface ModalDeleteUserProps {
  deleteModalOpen: boolean;
  setDeleteModalOpen: (isOpen: boolean) => void;
  emailToDelete: string;
  handleDelete: (email: string) => void;
}

const ModalDeleteUser: React.FC<ModalDeleteUserProps> = ({
  deleteModalOpen,
  setDeleteModalOpen,
  emailToDelete,
  handleDelete,
}) => {
  if (!deleteModalOpen) {
    return null;
  }
  return (
    <div
      onClick={() => setDeleteModalOpen(false)}
      className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-neutral-800/70 inset-0 flex justify-center items-center text-white"
    >
      <div
        className={`bg-white rounded-lg p-5 max-w-max translate transform duration-300
          ${deleteModalOpen ? "translate-y-0" : "translate-y-full"}
          ${deleteModalOpen ? "opacity-100" : "opacity-0"}
        `}
      >
        <button
          onClick={() => setDeleteModalOpen(false)}
          className="text-lettercolor w-full cursor-pointer"
        >
          <IoIosClose className="text-3xl" />
        </button>
        <div className="w-full text-center">
          <p className="text-lettercolor">Are you sure?</p>
          <p className="text-lettercolor">
            Are you sure you want to delete this user?
          </p>
          <p className="font-bold text-lettercolor">{emailToDelete} </p>
          <div className="w-full flex justify-between space-x-5 mt-5 ">
            <button
              onClick={() => {
                handleDelete(emailToDelete);
                setDeleteModalOpen(false);
              }}
              className="w-full border rounded-md px-4 py-1 text-lettercolor hover:text-blue-600"
            >
              Yes
            </button>
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="w-full border rounded-md px-4 py-1 text-subtext hover:text-blue-600"
            >
              No. Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteUser;
