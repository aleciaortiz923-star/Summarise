'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import getFirebase from '@/lib/firebase';
import { Auth } from 'firebase/auth';
import { FirebaseStorage } from 'firebase/storage';
import { Firestore } from 'firebase/firestore';
import { Analytics } from 'firebase/analytics';

interface FirebaseContextType {
  auth: Auth | null;
  storage: FirebaseStorage | null;
  db: Firestore | null;
  analytics: Analytics | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({ 
  auth: null, 
  storage: null, 
  db: null, 
  analytics: null, 
  loading: true 
});

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebase, setFirebase] = useState<Omit<FirebaseContextType, 'loading'>>({ auth: null, storage: null, db: null, analytics: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { auth, db, storage, analytics } = getFirebase();
    setFirebase({ auth, db, storage, analytics });
    setLoading(false);
  }, []);

  return (
    <FirebaseContext.Provider value={{ ...firebase, loading }}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
