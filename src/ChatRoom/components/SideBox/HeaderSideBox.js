import { Avatar, Button, Typography } from 'antd';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { styled } from 'styled-components';
import { auth } from '../../../config/firebase';
import { AuthContext } from '../../../context/Auth';

const HeaderSideBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #333;
  background-color: #1a1a1d;
  height: 70px;
  .header__name {
    font-weight: 600;
    font-size: 16px;
    margin-left: 8px;
    color: #fff;
  }
`;
export default function HeaderSideBox() {
  const { displayName, photoURL } = useContext(AuthContext);

  return (
    <HeaderSideBoxStyle>
      <div>
        <Avatar src={photoURL}>{photoURL ? '' : displayName.charAt(0).toUppercase()}</Avatar>
        <Typography.Text className="header__name">{displayName}</Typography.Text>
      </div>
      <Button ghost onClick={() => signOut(auth)}>
        Đăng Xuất
      </Button>
    </HeaderSideBoxStyle>
  );
}
