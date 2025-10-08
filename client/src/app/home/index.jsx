import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firbase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';
import UserProfiles from '../../components/UserProfiles';

const Home = () => {

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
      if (!currentUser) return;
  
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.isPaid === false) {
            navigate("/pending", { replace: true });
          }
        }
      });
  
      return () => unsub();
    }, [currentUser, navigate]);

  

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // redirect after logout
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  
  return (
    <>
      <Navbar />
      <HeroSection />
      <UserProfiles />
      <Footer/>
    </>
  );
}

export default Home