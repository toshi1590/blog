import { useRef } from "react";

export const ImageEditor = (props) => {
  const file_ref = useRef();

  const add = () => {
    fetch('http://localhost:82/api/images', {
      method: 'POST',
      body: new FormData(document.forms[0])
    })
    .then(res => res.json())
    .then((json) => {
      props.setImages(json);
      file_ref.current.value = '';
    })
  }

  return (
    <>
      <form>
        <input type="file" name="image" ref={file_ref} />
        <input type="button" value="add" onClick={() => {add()}} />
      </form>
    </>
  );
}