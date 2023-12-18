import {Input} from './Input';
import {Textarea} from './Textarea';
import {Submit} from './Submit';
import { useState, useRef } from "react";

export const ContactPage = () => {
  const [errors, setErrors] = useState([]);
  const [result, setResult] = useState();
  const name_ref = useRef();
  const email_ref = useRef();

  const send_message = () => {
    let flag = true;

    if (flag) {
      console.log('Your message was sent.');
      setResult('success');
    } else {
      setResult('failure');      
    }
  }

  return (
    <>
      <form action="" name="contactForm">
        {result}
        <Input label="name" type="name" name="name" ref={name_ref} error={errors[0]} conditions={['required', 'onlytext']} />
        <Input label="email" type="email" name="email" ref={email_ref} error={errors[1]} conditions={['required', 'onlytext']} />
        <Textarea label="message" name="message" />
        <Submit 
          value="submit" 
          setErrors={setErrors} 
          validation_elements={[name_ref, email_ref]}
          following_process={() => {send_message()}}
        />
      </form>
    </>
  );
}
