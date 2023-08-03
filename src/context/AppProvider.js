import React, { createContext, useContext, useMemo, useState } from 'react';
import useFireStore from '../hooks/useFireStore';
import { AuthContext } from './Auth';

export const AppProviderContext = createContext({});
export default function AppProvider({ children }) {
  const { uid } = useContext(AuthContext);
  const [isOpenModalAddRoom, setIsOpenModalAddRoom] = useState(false);
  const [isOpenModalInvateRoom, setIsOpenModalInvateRoom] = useState(false);
  const [selectRoomId, setSelectRoomId] = useState('');
  const paramWhere = useMemo(() => {
    return { fieldName: 'uid', operator: 'array-contains', value: uid };
  }, [uid]);
  const rooms = useFireStore({ collectionName: 'rooms', paramWhere });
  //   handle Select Room
  const selectRoom = useMemo(() => {
    if (selectRoomId === '' || rooms.length === 0) return [];
    return rooms.filter((room) => room.id === selectRoomId);
  }, [selectRoomId, rooms]);
  // handle user in selected room
  const paramWhereUser = useMemo(() => {
    return { fieldName: 'uid', operator: 'in', value: selectRoom[0]?.uid };
  }, [selectRoom]);
  const users = useFireStore({ collectionName: 'users', paramWhere: paramWhereUser });
  return (
    <AppProviderContext.Provider
      value={{
        rooms,
        isOpenModalAddRoom,
        setIsOpenModalAddRoom,
        setSelectRoomId,
        selectRoomId,
        selectRoom,
        users,
        isOpenModalInvateRoom,
        setIsOpenModalInvateRoom
      }}
    >
      {children}
    </AppProviderContext.Provider>
  );
}
