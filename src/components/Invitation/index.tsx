import { useState } from "react";
import InvitationModal from "./InvitationModal";
import InvitationsTable from "./InvitationModal/table";
import UserTable from "./InvitationModal/UserTable";
import * as React from "react";


const Invitation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center pr-4">
      <div className="flex w-full flex-col items-start justify-start p-4">
        <button
          onClick={handleOpenModal}
          className="w-48 rounded-lg bg-blue-500 px-6 py-2 text-xl font-semibold text-white shadow transition hover:bg-blue-600"
        >
          دعوت‌نامه
        </button>
        {isModalOpen && (
          <InvitationModal showModal={isModalOpen} onClose={handleCloseModal} />
        )}
      </div>
      <UserTable />
      <InvitationsTable />
    </div>
  );
};

export default Invitation;
