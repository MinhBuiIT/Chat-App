import { Alert } from 'antd';
import React, { useContext } from 'react';
import { AppProviderContext } from '../../../context/AppProvider';
import ContentMainChat from './ContentMainChat';
import HeaderMainChat from './HeaderMainChat';

export default function MainChat() {
  const { selectRoom } = useContext(AppProviderContext);
  return (
    <>
      {selectRoom.length !== 0 ? (
        <>
          <HeaderMainChat />
          <ContentMainChat />
        </>
      ) : (
        <Alert showIcon type="info" message="Vui lòng chọn phòng" />
      )}
    </>
  );
}
