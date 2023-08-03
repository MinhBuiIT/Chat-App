import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';

export default function useFireStore({ collectionName, paramWhere }) {
  const [document, setDocument] = useState([]);
  useEffect(() => {
    const { fieldName, operator, value } = paramWhere;
    let unsubscribe;
    const getData = async () => {
      if (!value) return;
      unsubscribe = onSnapshot(collection(db, collectionName), async (snapshot) => {
        const q = query(collection(db, collectionName), where(fieldName, operator, value), orderBy('createAt'));

        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        setDocument(documents);
      });
    };
    getData();
    return unsubscribe;
  }, [paramWhere, collectionName]);
  return document;
}
