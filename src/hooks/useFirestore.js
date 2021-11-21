import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
  document: null,
  loading: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        document: null,
        loading: true,
        error: null,
        success: false,
      };

    case 'ADDED_DOCUMENT':
      return {
        document: action.payload,
        loading: false,
        error: null,
        success: true,
      };

    case 'DELETE_DOCUMENT':
      return {
        document: null,
        loading: false,
        error: null,
        success: true,
      };

    case 'ERROR':
      return {
        document: null,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [cancelled, setCancelled] = useState(false);
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  // ref for the collection
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispatchCancel = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // ading document to firestore
  const addDocument = async (doc) => {
    dispatch({ type: 'LOADING' });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const newDocument = await ref.add({ ...doc, createdAt });
      dispatchCancel({ type: 'ADDED_DOCUMENT', payload: newDocument });

      if (!cancelled) {
      }
    } catch (error) {
      dispatchCancel({ type: 'ERROR', payload: error.message });
    }
  };

  // delete document from firestore
  const deleteDocument = async (id) => {
    dispatch({ type: 'LOADING' });

    try {
      await ref.doc(id).delete();
      dispatchCancel({ type: 'DELETE_DOCUMENT' });
    } catch (error) {
      dispatchCancel({ type: 'ERROR', payload: 'Could not delete!' });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
