import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useCollection = (
  collection,
  _firstQuery,
  _secondQuery,
  _thirdQuery,
  _orderBy,
  _onlyMe = true
) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  // Using ref so the side effect won't run into infinite loop
  // ...due the fact that query depencency is a reference type
  const firstQuery = useRef(_firstQuery).current;
  const secondQuery = useRef(_secondQuery).current;
  const thirdQuery = useRef(_thirdQuery).current;
  const orderBy = useRef(_orderBy).current;
  const onlyMe = useRef(_onlyMe).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (onlyMe) {
      ref = ref.where("uid", "==", user.uid);
    }

    if (firstQuery) {
      ref = ref.where(...firstQuery);
    }

    if (secondQuery) {
      ref = ref.where(...secondQuery);
    }

    if (thirdQuery) {
      ref = ref.where(...thirdQuery);
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

        console.log("✅", collection);

        // updating state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data");
      }
    );

    return () => unsubscribe();
    // eslint-disable-next-line
  }, [collection, firstQuery, secondQuery, thirdQuery, orderBy]);

  return { documents, error };
};
