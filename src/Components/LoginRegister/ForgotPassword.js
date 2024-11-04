import React, { useState } from 'react'
import './ForgotPassword.css';
import { FaEnvelope } from "react-icons/fa";
import { auth } from './firebase'; // Ensure the correct path to your firebase config
import { sendPasswordResetEmail,fetchSignInMethodsForEmail } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
const[email,setEmail]=useState('');
const navigate=useNavigate();
const handlePasswordReset=async(e)=>{
    e.preventDefault();
    try{
        const methods = await fetchSignInMethodsForEmail(auth, email);
      
      // If methods is empty, it means no user is associated with that email
      if (methods.length === 0) {
        toast.error("This email has not been registered.", {
          position: 'bottom-center',
        });
        return;
      }
     await sendPasswordResetEmail(auth,email);
     toast.success("Password reset email sent!", {
        position: 'top-center',
    });
    }catch(error){
        toast.error(error.message, {
            position: 'bottom-center',
        })
    }
    
};
const tonavigatesubmit=()=>{
    navigate('/');
};
  return (
    <div className='forgot'>
     <IoMdArrowRoundBack className='icon2' onClick={tonavigatesubmit}/>
    <h2>Forgot Password</h2>
    <p>Enter your email to reset your password.</p>
    <div className='form-box-login2'>
      <form onSubmit={handlePasswordReset}>
        <div className='input-box'>
        <input type="email" placeholder="Email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <FaEnvelope className='icon'/>
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
    <ToastContainer/>
  </div>
  )
}

