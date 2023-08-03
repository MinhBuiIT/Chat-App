import { Col, Row } from 'antd';
import React from 'react';
import HeaderSideBox from './HeaderSideBox';
import SectionSideBox from './SectionSideBox';

export default function SideBox() {
  return (
    <Row>
      <Col span={24}>
        <HeaderSideBox />
      </Col>
      <Col span={24}>
        <SectionSideBox />
      </Col>
    </Row>
  );
}
