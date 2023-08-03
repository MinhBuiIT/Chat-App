import { Avatar, Typography } from 'antd';
import React from 'react';
import { styled } from 'styled-components';

const { Text } = Typography;

const MessageItemStyle = styled.div`
  & {
    padding: 16px 0 16px 16px;
  }
  .message__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    max-width: 50%;
    .message__header--name {
      display: flex;
      align-items: center;
      gap: 3px;
      color: white;
    }
  }
  .message__content {
    background-color: #1e1f28;
    margin-top: 8px;
    max-width: 300px;
    border-radius: 8px;
    padding: 8px;
    color: white;
    font-size: 14px;
    line-height: 1.4;
    font-weight: 400;
  }
`;
export default function MessageItem(props) {
  const { text, name, createAt, avatar } = props;
  return (
    <MessageItemStyle>
      <div className="message__header">
        <div className="message__header--name">
          <Avatar src={avatar} style={{ background: 'green' }}>
            {avatar ? '' : name.charAt(0).toUpperCase()}
          </Avatar>
          <Text style={{ color: 'white' }}>{name}</Text>
        </div>
        <Text style={{ color: '#999' }}>{createAt}</Text>
      </div>
      <div className="message__content">{text}</div>
    </MessageItemStyle>
  );
}
