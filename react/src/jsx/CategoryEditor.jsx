import { useRef } from "react";
import { useHandleValue } from './useHandleValue';

export const CategoryEditor = (props) => {
  const input_ref = useRef();
  const [name, setName, updateName] = useHandleValue('');

  const add = () => {
    (async () => {
      const res = await fetch('http://localhost:82/api/categories', {
        method: 'POST',
        body: new FormData(document.forms[0])
      });
      const json = await res.json();
      props.setCategories(json);
      setName('');
    })();
  }

  return (
    <>
      <form>
        <input type="text" name="name" value={name} ref={input_ref} onChange={updateName} placeholder="new category" />
        <input type="button" onClick={add} value="add" />     
      </form>
    </>
  );
}