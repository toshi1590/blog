import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {Input} from './Input';
import {Submit} from './Submit';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [result, setResult] = useState();
  const email_ref = useRef();
  const password_ref = useRef();

  const login = () => {
    // fetch("http://localhost:8000/login", {
    fetch("http://localhost:82/login", {
      headers: {
        Accept: "application/json",
      },
      credentials: "include"
    })
    .then((res) => {
      if (res.ok) {
        const cookies = document.cookie.split("; ");
        const cookie = cookies.find((_) => _.startsWith("XSRF-TOKEN")) || "";
        const csrfToken = decodeURIComponent(cookie.split("=")[1]);

        // fetch("http://localhost:8000/login", {
        fetch("http://localhost:82/login", {
          method: "POST",
          headers: {
            "X-XSRF-TOKEN": csrfToken,
          },
          credentials: "include",
          body: new FormData(document.forms[0])
        })
        .then(() => navigate('/admin'))
        .catch(() => setResult('Your email or password is wrong (or both)'))
      }
    });
  }

  return (
    <>
      <form>
        {result}
        <Input 
          label="email" 
          type="email" 
          name="email" 
          ref={email_ref} 
          error={errors[0]} 
          conditions={['required']} 
          defaultValue="1590a1590a@gmail.com" 
        />
        <Input 
          label="password" 
          type="password" 
          name="password" 
          ref={password_ref} 
          error={errors[1]} 
          conditions={['required']} 
          defaultValue="per57557" 
        />
        <Submit 
          value="login" 
          setErrors={setErrors} 
          validation_elements={[email_ref, password_ref]}
          following_process={() => {login()}}
        />
      </form>

      <button onClick={() => {navigate('/register')}}>register</button>
    </>
  );
}