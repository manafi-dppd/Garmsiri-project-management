import {useState} from 'react';
import InvitationModal from './InvitationModal';
import InvitationsTable from './InvitationModal/table';

const Invitation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    console.log('Submit clicked!');
    setIsModalOpen(false);
  };

  const handleAccessLevelsUpdate = (updatedLevels: any) => {
    console.log('Updated access levels:', updatedLevels);
  };

  const handleAccessLevelSubmit = (submittedData: any) => {
    console.log('Access level submitted:', submittedData);
  };

  return (
    <div className="flex flex-col items-center pr-4">
      <div className="w-full flex justify-start flex-col items-start p-4">
        <button
          onClick={handleOpenModal}
          className="text-xl font-semibold bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition w-48"
        >
          دعوت‌نامه
        </button>
        {isModalOpen && (
          <InvitationModal
            showModal={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
            onAccessLevelsUpdate={handleAccessLevelsUpdate}
            onAccessLevelSubmit={handleAccessLevelSubmit}
          />
        )}
      </div>
      <InvitationsTable />
    </div>
  );
};

export default Invitation;
