import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, providerGoogle } from '../config/firebase';
import { addFireStore, generateKeywords } from '../config/service';

const { Title } = Typography;
export default function Login() {
  const handleLoginGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, providerGoogle);
      const { isNewUser } = response._tokenResponse;
      if (isNewUser) {
        const { displayName, uid, email, photoURL } = response.user;
        addFireStore('users', {
          displayName,
          uid,
          email,
          photoURL,
          keywords: generateKeywords(displayName.toLowerCase())
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row justify="center">
      <Col span={16}>
        <Title level={1} style={{ textAlign: 'center' }}>
          Chat App
        </Title>
      </Col>
      <Col span={16}>
        <Button icon={<GooglePlusOutlined />} style={{ width: '100%' }} size="large" onClick={handleLoginGoogle}>
          Đăng Nhập Bằng Google
        </Button>
      </Col>
    </Row>
  );
}
