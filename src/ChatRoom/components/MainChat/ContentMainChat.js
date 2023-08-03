import { SendOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { formatRelative } from 'date-fns';
import React, { useContext, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { addFireStore } from '../../../config/service';
import { AppProviderContext } from '../../../context/AppProvider';
import { AuthContext } from '../../../context/Auth';
import useFireStore from '../../../hooks/useFireStore';
import MessageItem from './MessageItem';

const ContentMainChatStyle = styled.div`
  height: calc(100vh - 70px);
  background-color: #0e0e10;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;
const InputStyle = styled(Input)`
  background-color: transparent;
  color: white;
  border: 1px solid #333;
  padding: 10px 12px;
  font-size: 16px;
  &::placeholder {
    color: #333;
  }
`;
const SendOutlinedStyle = styled(SendOutlined)`
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  color: white;
`;
const MessageListStyle = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background: #3e4042;
    border-radius: 10px;
    cursor: pointer;
  }
`;
function ContentMainChat() {
  const [form] = Form.useForm();
  const { displayName, email, uid, photoURL } = useContext(AuthContext);
  const { selectRoomId } = useContext(AppProviderContext);
  const [messageState, setMessageState] = useState('');
  const handleSubmit = async () => {
    await addFireStore('message', { text: messageState, displayName, email, uid, photoURL, uidRoom: selectRoomId });
    form.resetFields();
    setMessageState('');
  };
  const paramWhereMessage = useMemo(() => {
    return { fieldName: 'uidRoom', operator: '==', value: selectRoomId };
  }, [selectRoomId]);
  const messageData = useFireStore({ collectionName: 'message', paramWhere: paramWhereMessage });
  return (
    <ContentMainChatStyle>
      <MessageListStyle>
        {messageData.length !== 0 &&
          messageData.map((data) => {
            let timeFormat = '';
            const seconds = data?.createAt?.seconds;
            if (seconds) {
              timeFormat = formatRelative(new Date(seconds * 1000), new Date());
              timeFormat = timeFormat.charAt(0).toUpperCase() + timeFormat.slice(1);
            }
            return (
              <MessageItem
                key={data.id}
                name={data.displayName}
                createAt={timeFormat}
                text={data.text}
                avatar={data.photoURL}
              ></MessageItem>
            );
          })}
      </MessageListStyle>
      <div>
        <Form wrapperCol={{ span: 24 }} style={{ position: 'relative' }} form={form}>
          <FormItem style={{ marginBottom: '6px' }}>
            <InputStyle
              placeholder="Nhập tin nhắn..."
              onPressEnter={handleSubmit}
              value={messageState}
              onChange={(e) => setMessageState(e.target.value)}
            />
          </FormItem>
          <SendOutlinedStyle onClick={handleSubmit} />
        </Form>
      </div>
    </ContentMainChatStyle>
  );
}

export default ContentMainChat;
