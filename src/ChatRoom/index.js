import { Col, Row } from 'antd';
import React from 'react';
import MainChat from './components/MainChat';
import SideBox from './components/SideBox';

export default function ChatRoom() {
  return (
    <Row>
      <Col span={6}>
        <SideBox></SideBox>
      </Col>
      <Col span={18}>
        <MainChat />
      </Col>
    </Row>
  );
}
