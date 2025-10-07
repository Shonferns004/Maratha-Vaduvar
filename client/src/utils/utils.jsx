import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firbase";

const PaidRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setIsPaid(!!data.isPaid);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;

  // if not logged in → go login
  if (!currentUser) return <Navigate to="/login" replace />;

  // if logged in but unpaid → force to Pending
  // if (!isPaid) return <Navigate to="/pending" replace />;

  return children;
};

export default PaidRoute;
