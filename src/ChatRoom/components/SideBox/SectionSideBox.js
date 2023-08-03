import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Collapse, Modal, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { styled } from 'styled-components';
import { deleteFireStore } from '../../../config/service';
import { AppProviderContext } from '../../../context/AppProvider';

const SectionSideBoxStyle = styled.div`
  height: calc(100vh - 70px);
  background-color: #1a1a1d;
`;
const CollapseStyle = styled(Collapse)`
  &&& {
    .ant-collapse-header-text {
      color: white;
    }
    svg {
      fill: white;
    }
    .ant-collapse-content-box {
      display: flex;
      flex-direction: column;
      padding-left: 35px;
    }
  }
`;
const LinkStyle = styled(Typography.Link)`
  color: #fff !important;
  font-size: 16px;
  margin-top: 4px;
  &:hover {
    color: #1677ff !important;
  }
`;
export default function SectionSideBox() {
  /**
   * {
   *  name: string,
   * description,
   * uid: [uid1,..]
   * }
   */
  const { rooms, setIsOpenModalAddRoom, setSelectRoomId } = useContext(AppProviderContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const handleDeleteRoom = async (idRoom) => {
    //
  };
  const items = [
    {
      key: '1',
      label: 'Danh Sách Các Phòng',
      children:
        rooms.length !== 0 &&
        rooms.map((item) => {
          return (
            <div key={item.createAt} style={{ marginTop: '10px' }}>
              <LinkStyle onClick={() => setSelectRoomId(item.id)}>{item.name}</LinkStyle>
              <DeleteOutlined
                style={{ marginLeft: '30px', cursor: 'pointer' }}
                onClick={() => {
                  setIdDelete(item.id);
                  setIsOpenModal(true);
                }}
              />
            </div>
          );
        })
    }
  ];
  const handleAdd = () => {
    setIsOpenModalAddRoom(true);
  };
  const handleOk = async () => {
    if (idDelete === '') return;
    await deleteFireStore('rooms', idDelete);
    setIsOpenModal(false);
  };
  const handleCancle = () => {
    setIsOpenModal(false);
  };

  return (
    <SectionSideBoxStyle>
      <CollapseStyle ghost defaultActiveKey={['1']} items={items}></CollapseStyle>
      <Button icon={<AppstoreAddOutlined />} ghost style={{ marginLeft: '12px', border: 'none' }} onClick={handleAdd}>
        Thêm Phòng
      </Button>
      <Modal open={isOpenModal} onCancel={handleCancle} onOk={handleOk}>
        <p>Bạn có muốn xóa ?</p>
      </Modal>
    </SectionSideBoxStyle>
  );
}
