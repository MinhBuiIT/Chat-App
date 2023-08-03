import { LoadingOutlined } from '@ant-design/icons';
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

export const AuthContext = createContext({});
export default function Auth({ children }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {
          displayName,
          email,
          metadata: { createdAt },
          photoURL,
          uid
        } = user;
        setIsLoading(false);
        setUserData({ displayName, email, createdAt, photoURL, uid });
        navigate('/');
      } else {
        setUserData({});
        setIsLoading(false);
        navigate('/login');
      }
    });
    return () => {
      unsubcribe();
    };
  }, [navigate]);
  return <AuthContext.Provider value={userData}>{isLoading ? <LoadingOutlined /> : children}</AuthContext.Provider>;
}
