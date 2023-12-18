import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {Input} from './Input';
import {Submit} from './Submit';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [result, setResult] = useState();
  const name_ref = useRef();
  const email_ref = useRef();
  const password_ref = useRef();

  const register = () => {
    fetch("http://localhost:8000/register", {
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

        fetch("http://localhost:8000/register", {
          method: "POST",
          headers: {
            "X-XSRF-TOKEN": csrfToken,
          },
          credentials: "include",
          body: new FormData(document.forms[0])
        })
        .then(() => navigate('/admin'))
        .catch(() => setResult('Your email is already used.'))
      }
    });
  }

  return (
    <>
      <form>
        {result}
        <Input 
          label="name" 
          type="name" 
          name="name" 
          ref={name_ref} 
          error={errors[0]} 
          conditions={['required']} 
        />
        <Input 
          label="email" 
          type="email" 
          name="email" 
          ref={email_ref} 
          error={errors[1]} 
          conditions={['required']} 
          defaultValue="@gmail.com" 
        />
        <Input 
          label="password" 
          type="password" 
          name="password" 
          ref={password_ref} 
          error={errors[2]} 
          conditions={['required']} 
          defaultValue="per57557" 
        />
        <Submit 
          value="register" 
          setErrors={setErrors} 
          validation_elements={[name_ref, email_ref, password_ref]}
          following_process={() => {register()}}
        />
      </form>

      <button onClick={() => {navigate('/login')}}>login</button>
    </>
  );
}