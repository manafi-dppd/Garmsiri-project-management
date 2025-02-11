import React from 'react';
import {useState, useEffect} from 'react';

interface BodyRequestPumpingProps {
  userName: string;
  userRole: string;
  firstName: string;
  lastName: string;
  networkName: string;
  pumpStationName: string;
  idPumpStation: number;
  saleZeraee: string;
  doreKesht: string;
  idShDo: number;
}

const BodyRequestPumping: React.FC<BodyRequestPumpingProps> = ({
  userName,
  userRole,
  firstName,
  lastName,
  networkName,
  pumpStationName,
  idPumpStation,
  saleZeraee,
  doreKesht,
  idShDo,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">اطلاعات درخواست</h2>
      <p>
        <strong>نام کاربر:</strong> {userName}
      </p>
      <p>
        <strong>نقش کاربر:</strong> {userRole}
      </p>
      <p>
        <strong>نام :</strong> {firstName}
      </p>
      <p>
        <strong>نام خانوادگی :</strong> {lastName}
      </p>
      <p>
        <strong>شبکه آبیاری:</strong> {networkName}
      </p>
      <p>
        <strong>ایستگاه پمپاژ:</strong> {pumpStationName}
      </p>
      <p>
        <strong>آی دی ایستگاه پمپاژ:</strong> {idPumpStation}
      </p>
      <p>
        <strong>سال زراعی:</strong> {saleZeraee}
      </p>
      <p>
        <strong>دوره کشت:</strong> {doreKesht}
      </p>
      <p>
        <strong>آی دی سال زراعی-دوره کشت:</strong> {idShDo}
      </p>
    </div>
  );
};

export default BodyRequestPumping;
