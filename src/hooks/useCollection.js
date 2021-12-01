import { useState, useEffect, useRef } from 'react';
import { projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useCollection = (
  collection,
  _firstQuery,
  _secondQuery,
  _orderBy
) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  // Using ref so the side effect won't run into infinite loop
  // ...due the fact that query depencency is a reference type
  const firstQuery = useRef(_firstQuery).current;
  const secondQuery = useRef(_secondQuery).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore
      .collection(collection)
      .where('uid', '==', user.uid);

    if (firstQuery) {
      ref = ref.where(...firstQuery);
    }

    if (secondQuery) {
      ref = ref.where(...secondQuery);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // updating state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError('Could not fetch the data');
      }
    );

    return () => unsubscribe();
    // eslint-disable-next-line
  }, [collection, firstQuery, secondQuery, orderBy]);

  return { documents, error };
};
