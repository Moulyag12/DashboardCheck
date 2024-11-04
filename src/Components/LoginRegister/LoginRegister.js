import React, { useState } from 'react'
import './LoginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser,FaLock ,FaEnvelope } from "react-icons/fa";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,signInWithPopup } from 'firebase/auth';
import { auth,googleProvider,db } from './firebase';
import {setDoc,doc,getDoc} from 'firebase/firestore';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const LoginRegister = () => {
  const [action,setAction]=useState('');
  const[loginEmail,setLoginUserName]=useState('');
  const[loginPassword,setLoginPassword]=useState('');
  const[registerUserName,setRegisterUserName]=useState('');
  const[registerEmail,setRegisterEmail]=useState('');
  const[registerPassword,setRegisterPassword]=useState('');
  const navigate=useNavigate();
  const registerLink=()=>{
    setAction('active');
    console.log("register clicked");
  }

  const loginLink=()=>{
    setAction('');
    console.log("login clicked");
  }
  const handleLoginSubmit=async(e)=>{
    e.preventDefault();
    console.log("Login info",{loginEmail,loginPassword});
    try{
      await signInWithEmailAndPassword(auth,loginEmail,loginPassword);
      toast.success("User logged in successfully",{
        position:'top-center',
      })

      setTimeout(()=>{
        navigate('checkin');
      },1000)
    }catch(error){
      toast.error(error.message,{
        position:'bottom-center',
      })
    }
    
  };
  const handleRegisterSubmit=async(e)=>{
    e.preventDefault();
    console.log("Register info",{registerUserName,registerEmail,registerPassword});
    try{
      await createUserWithEmailAndPassword(auth,registerEmail,registerUserName);
      const user=auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db,"Users",user.uid),{
          email:user.email,
          Name:registerUserName,
        })
      }
      console.log("user registerd successfully");
      toast.success("User registered successfully",{
        position:'top-center',
      })
    }catch(error){
          console.log(error.message);
          toast.error(error.message,{
            position:'bottom-center', 
          })
    }
  };
  const handleGoogleSignIn=async()=>{
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      if (user) {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
  
        if (!userDoc.exists()) {
          // If user does not exist in Firestore, add them as a new "registration"
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            name: user.displayName
          });
          toast.success("Account created with Google successfully", {
            position: 'top-center',
          });
        } else {
          toast.success("Signed in with Google successfully", {
            position: 'top-center',
          });
        }
  
        setTimeout(() => {
          navigate('checkin');
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'bottom-center',
      });
    }
  };
  
  return (
    <div>
<div className={`wrapper ${action}`}>            
    <div className="form-box-login">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div className='input-box'>
                    <input type="text" placeholder="Email" required  value={loginEmail} onChange={(e)=>setLoginUserName(e.target.value)}/>
                      <FaUser className='icon'/>
                    </div>
                    <div className='input-box'>
                    <input type="password" placeholder="Password"  required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
                    <FaLock className='icon'/>
                    </div>
                    <div className='remember-forgot'>
                        <label><input type='checkbox'/>Remember Me</label> 
                        <Link to="/forgot-password">Forgot password?</Link> 
                        </div>
                    <button type="submit" >Login</button>
                    <br></br>
                    <button type="button" onClick={handleGoogleSignIn} className="google-signin-button">Login with Google</button>
                    <div className='register-link'><p>Don't have an account?     <Link to='/' onClick={registerLink}>Register</Link></p></div>
                </form>
            </div>

            <div className="form-box-register">
                <h2>Register</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <div className='input-box'>
                    <input type="text" placeholder="Username" required value={registerUserName} onChange={(e)=>{setRegisterUserName(e.target.value)}}/>
                      <FaUser className='icon'/>
                    </div>
                    <div className='input-box'>
                    <input type="email" placeholder="Email"  required value={registerEmail} onChange={(e)=>{setRegisterEmail(e.target.value)}}/>
                    <FaEnvelope className='icon'/>
                    </div>
                    <div className='input-box'>
                    <input type="password" placeholder="Password"  required value={registerPassword} onChange={(e)=>{setRegisterPassword(e.target.value)}}/>
                    <FaLock className='icon'/>
                    </div>
                    <div className='remember-forgot'>
                        <label><input type='checkbox'/>I agree to terms & conditions</label> 
                    </div>
                    <button type="submit">Register</button>
                    <br></br>
                    <button type="button" onClick={handleGoogleSignIn} className="google-signin-button">Sign in with Google</button>
                    <div className='register-link'><p>Already have an account?     <Link to='/' onClick={loginLink}>Login</Link></p></div>
                </form>
            </div>
        </div> 
        <ToastContainer />

        </div>

  )
  
}





