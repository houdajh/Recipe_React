import React, { Component } from 'react'
import styled from "styled-components";
import Input from "./Input";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/css/bootstrap.css"
import {Card }  from 'react-bootstrap'
import { Alert ,Form} from "react-bootstrap";
import  {useRef, useState, useEffect } from "react";
import firebase from '@firebase/app-compat';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/firebase';


import {Button }  from 'react-bootstrap'

    var uiConfig = {
      signInFlow: "popup",
      
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
    
    
    
    
    
    
    const  Sidebar = () => {
      const emailRef = useRef()
      const passwordRef = useRef()
      const passwordConfirmRef = useRef()
      const [user, setUser] = useState(null)
      const [error, setError] = useState("")
      const [loading, setLoading] = useState(false)
      const history = useHistory()
      const { signup } = useAuth()
    
      async function handleSubmit(e) {
        e.preventDefault()
    
       if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }
    
        try {
          setError("")
          setLoading(true)
          await signup(emailRef.current.value, passwordRef.current.value)
          
            const user = firebase.auth().currentUser;
            const authObserver = firebase.auth().onAuthStateChanged((user) => {
              db.collection('User').doc(user.email).set({
                'email': user.email
            })
              setUser(user);
            });
          
          history.push("/")
        } catch(err) {
          setError("Failed to create an account")
          console.log(err)
        }
    
        setLoading(false)
      }
    
      useEffect(() => {
        const user = firebase.auth().currentUser;
        const authObserver = firebase.auth().onAuthStateChanged((user) => {
          setUser(user);
        });
        return authObserver;
      });
    
      console.log("user", user);
   
  return (
    <Container>
      <LogoWrapper>
        <h3>
          Healthy <span>Food</span>
        </h3>
      </LogoWrapper>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form  className="forme" onSubmit={handleSubmit}>
        <h3 className="h3">Sign Up</h3>
        <Form.Group  id="email">
                        <Form.Label >Enter your email</Form.Label>
                        <Form.Control size="lg" type="email" ref={emailRef} required placeholder=" email" />
                    </Form.Group>
                    <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control size="lg" type="password" ref={passwordRef} required placeholder=" password" />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control size="lg" type="password" ref={passwordConfirmRef} required placeholder=" password" />
                </Form.Group>
                    <br></br>
      

  <style >
    {`
    .forme{
      width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
    }
    .h3 {
      color: #666666;
      margin-bottom: 2rem;
    }
    .btn {
      
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
    `}
  </style>
        <Button variant="outline-success" size="lg" className="btn" disabled={loading} type="submit">Sign Up</Button>
        
      </Form>
      <div>
        <Terms>
          By signing up, I agree to the Privacy Policy <br /> and Terms of
          Service
        </Terms>
        <h4>
        <style >
    {`
    .link {
      color: #FF8D8D;
    }
    .link:hover {
       color: #198754
    }
    `}
  </style>
          Already have an account?  <Link  to="/signIn" className="link">Sign In</Link>
        </h4>
      </div>
    </Container>
  );
    }

    
const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 10px;
  color: #808080;
  font-weight: 300;
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