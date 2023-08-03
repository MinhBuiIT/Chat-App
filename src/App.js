import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import './App.css';
import ChatRoom from './ChatRoom';
import Login from './Login';
import ModalAddRoom from './Modal/ModalAddRoom';
import ModalInviteRoom from './Modal/ModalInviteRoom';
import { AuthContext } from './context/Auth';

const RejectRouter = () => {
  const user = useContext(AuthContext);
  const isAuthentication = Object.keys(user).length;
  return isAuthentication === 0 ? <Navigate to={'/login'} /> : <Outlet />;
};
const ProtectRouter = () => {
  const user = useContext(AuthContext);
  const isAuthentication = Object.keys(user).length;
  return isAuthentication === 0 ? <Outlet /> : <Navigate to={'/'} />;
};
function App() {
  const element = useRoutes([
    {
      path: '/login',
      element: <ProtectRouter />,
      children: [
        {
          path: '',
          element: <Login />
        }
      ]
    },
    {
      path: '/',
      element: <RejectRouter />,
      children: [
        {
          path: '',
          element: <ChatRoom />
        }
      ]
    }
  ]);

  return (
    <div>
      {element}
      <ModalAddRoom />
      <ModalInviteRoom />
    </div>
  );
}

export default App;
