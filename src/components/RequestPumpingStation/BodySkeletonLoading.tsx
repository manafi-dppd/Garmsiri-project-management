// src/components/RequestPumpingStation/BodySkeletonLoading.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BodySkeletonLoading: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      {/* اسکلت لودینگ برای جدول */}
      <div className="mb-4">
        <Skeleton height={40} count={5} />
      </div>

      {/* اسکلت لودینگ برای PumpingActions */}
      <div className="flex flex-row gap-4 mt-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-lg flex-grow min-w-[150px] max-w-[200px]"
          >
            <Skeleton height={20} width={100} />
            <Skeleton height={40} className="mt-2" />
          </div>
        ))}
      </div>

      {/* اسکلت لودینگ برای PaginationForMah */}
      <div className="flex items-center justify-right gap-4 mt-4">
        <Skeleton height={40} width={40} />
        <Skeleton height={40} width={100} />
        <Skeleton height={40} width={40} />
      </div>
    </div>
  );
};

export default BodySkeletonLoading;
