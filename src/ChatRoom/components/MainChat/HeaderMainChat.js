import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip, Typography } from 'antd';
import React, { useContext } from 'react';
import { styled } from 'styled-components';
import { AppProviderContext } from '../../../context/AppProvider';

const HeaderMainChatStyle = styled.div`
  height: 70px;
  background-color: #0e0e10;
  border-bottom: 1px solid #333;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  .header__left {
    display: flex;
    flex-direction: column;
    .text {
      color: white;
    }
    .title {
      font-weight: bold;
      font-size: 18px;
      color: white;
    }
  }
  .header_right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
export default function HeaderMainChat() {
  const { selectRoom, users, setIsOpenModalInvateRoom } = useContext(AppProviderContext);
  return (
    <HeaderMainChatStyle>
      <div className="header__left">
        <Typography.Text className="title">{selectRoom[0] && selectRoom[0].name}</Typography.Text>
        <Typography.Text className="text">{selectRoom[0] && selectRoom[0].description}</Typography.Text>
      </div>
      <div className="header_right">
        <Button
          icon={<UserAddOutlined />}
          ghost
          style={{ border: 'none' }}
          onClick={() => setIsOpenModalInvateRoom(true)}
        >
          Mời
        </Button>
        <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
          {users &&
            users.map((user) => {
              return (
                <Tooltip key={user.createAt}>
                  <Avatar src={user.photoURL}>{user.photoURL ? '' : user.displayName.charAt(0).toUpperCase()}</Avatar>
                </Tooltip>
              );
            })}
        </Avatar.Group>
      </div>
    </HeaderMainChatStyle>
  );
}
