import { Avatar, Modal, Select, Spin, Typography } from 'antd';
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { debounce } from 'lodash';
import React, { useContext, useMemo, useState } from 'react';
import { db } from '../config/firebase';
import { AppProviderContext } from '../context/AppProvider';

function DebounceSelect({ fetchOptions, debounceTime = 300, ...props }) {
  const { selectRoom } = useContext(AppProviderContext);
  const [selectOption, setSelectOption] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const debounceFetch = useMemo(() => {
    const loadOptions = (value) => {
      setIsFetching(true);
      fetchOptions(value).then((data) => {
        const newData = data.filter((dataItem) => {
          if (selectRoom[0].uid) {
            return !selectRoom[0].uid.includes(dataItem.uid);
          }
          return false;
        });
        setIsFetching(false);
        setSelectOption(newData);
      });
    };
    return debounce(loadOptions, debounceTime);
  }, [debounceTime, fetchOptions, selectRoom]);
  return (
    <Select
      {...props}
      filterOption={false}
      onSearch={debounceFetch}
      notFoundContent={isFetching ? <Spin size="small" /> : null}
      style={{ width: '100%', marginTop: '20px' }}
    >
      {selectOption.length !== 0 &&
        selectOption.map((selectUser) => {
          return (
            <Select.Option key={selectUser.uid}>
              <Avatar src={selectUser.photoURL}>
                {selectUser.photoURL ? '' : selectUser.displayName.charAt(0).toUpperCase()}
              </Avatar>
              <Typography.Text style={{ marginLeft: '5px' }}>{selectUser.displayName}</Typography.Text>
            </Select.Option>
          );
        })}
    </Select>
  );
}
async function fetchingData(value) {
  const collectionQuery = query(
    collection(db, 'users'),
    orderBy('createAt'),
    where('keywords', 'array-contains', value.toLowerCase())
  );
  return getDocs(collectionQuery).then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data()
      };
    });
  });
}
export default function ModalInviteRoom() {
  const { isOpenModalInvateRoom, setIsOpenModalInvateRoom } = useContext(AppProviderContext);
  const { selectRoomId, selectRoom } = useContext(AppProviderContext);
  const [valueSelectInvite, setValueSelectInvite] = useState([]);
  const handleOk = async () => {
    await updateDoc(doc(db, 'rooms', selectRoomId), { uid: [...selectRoom[0].uid, ...valueSelectInvite] });
    setIsOpenModalInvateRoom(false);
    setValueSelectInvite([]);
  };
  const handleCancle = () => {
    setIsOpenModalInvateRoom(false);
    setValueSelectInvite([]);
  };
  return (
    <Modal open={isOpenModalInvateRoom} onOk={handleOk} onCancel={handleCancle}>
      <DebounceSelect
        fetchOptions={fetchingData}
        mode="multiple"
        placeholder="Nhập tên người dùng"
        value={valueSelectInvite}
        onChange={(newValue) => {
          setValueSelectInvite(newValue);
        }}
      />
    </Modal>
  );
}
