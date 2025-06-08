import * as React from 'react';
import { useState } from 'react';
import AccessLevelModal from '../Invitation/InvitationModal/AccessLevelModal';

export default function AdminMenuForm() {
  const [showAccessLevelModal, setShowAccessLevelModal] = useState(false);

  return (
    <div className="flex flex-col items-center pr-4">
      <div className="p-4flex flex w-full flex-col items-start justify-start p-4">
        <button
          onClick={() => setShowAccessLevelModal(true)}
          className="w-48 rounded-lg bg-blue-500 px-6 py-2 text-xl font-semibold text-white shadow transition hover:bg-blue-600"
        >
          مدیریت صفحات
        </button>
      </div>
      <AccessLevelModal
        show={showAccessLevelModal}
        onClose={() => setShowAccessLevelModal(false)}
        position_id={0}
        mode="menuManagement"
      />
    </div>
  );
}