import React,{useState} from 'react';
import styled from "styled-components";
import Input from "./Input";
import { Link, useHistory } from "react-router-dom";
import { db } from '../../firebase/firebase';

import { useAuth } from '../../context/AuthContext';
import  {useRef,  useEffect } from "react";
import firebase from '@firebase/app-compat';


var uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: async (authResult) => {
      const userInfo = authResult.additionalUserInfo;
      if (userInfo.isNewUser && userInfo.providerId === "password") {
        try {
          await authResult.user.sendEmailVerification();
          console.log("Check your email.");
        } catch (e) {
          console.log(e);
        }
      }
      return false;
    },
  },
};






const Sidebar = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [user, setUser] = useState(null);



  async function handleSubmit(e) {
    e.preventDefault()
    console.log(emailRef.current.value)
    try {
      db.collection("Admin").doc(emailRef.current.value).get()
      .then(doc => {
        if(doc.exists){
          console.log(doc.exists)
          setError("")
        setLoading(true)
         login(emailRef.current.value, passwordRef.current.value)
        history.push("/")
        }
        
        
      }).catch(
        err => console.dir(err)
      )

      
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }
  return (
    <Container>
      <LogoWrapper>
        <h3>
          Healthy <span>Food</span>
        </h3>
      </LogoWrapper>
      <Form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <Input 
			type="email" ref={emailRef} required placeholder=" email"/>

        <Input type="password" ref={passwordRef} required placeholder=" password"  />
        <button disabled={loading}>Sign Up</button>
      </Form>
      <div>
        <Terms>
          By signing up, I agree to the Privacy Policy <br /> and Terms of
          Service
        </Terms>
        <h4>
          
          You don't have an account? <span><Link to="/signUp">Sign Up</Link></span>
        </h4>
      </div>
    </Container>
  );
};

const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 10px;
  color: #808080;
  font-weight: 300;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: #666666;
    margin-bottom: 2rem;
  }
  button {
    width: 75%;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70edb9;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const LogoWrapper = styled.div`
  img {
    height: 6rem;
  }
  h3 {
    color: #ff8d8d;
    text-align: center;
    font-size: 22px;
  }
  span {
    color: #5dc399;
    font-weight: 300;
    font-size: 18px;
  }
`;

const Container = styled.div`
  min-width: 400px;
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;
  @media (max-width: 900px) {
    width: 100vw;
    position: absolute;
    padding: 0;
  }
  h4 {
    color: #808080;
    font-weight: bold;
    font-size: 13px;
    margin-top: 2rem;
    span {
      color: #ff8d8d;
      cursor: pointer;
    }
  }
`;

export default Sidebar;