import { useEffect, useRef, useState } from "react";
import {Input} from './Input';
import {Textarea} from './Textarea';
import {Select} from './Select';
import {Submit} from './Submit';
import {useHandleValue} from './useHandleValue';
import {useFetch} from './useFetch';
import {Fetch} from './Fetch';

export const ArticleEditor = (props) => {  
  const [title, setTitle, updateTitle] = useHandleValue(props.title);
  const [content, setContent, updateContent] = useHandleValue(props.content);
  const [category_id, setCategoryId, updateCategoryId] = useHandleValue(props.category_id);
  const [image_id_for_thumbnail, setImageIdForThumbnail, updateImageIdForThumbnail] = useHandleValue(props.image_id_for_thumbnail);
  const categories = useFetch('http://localhost:82/api/categories');
  const images = useFetch('http://localhost:82/api/images');
  const title_ref = useRef();
  const content_ref = useRef();
  const [errors, setErrors] = useState([]);
  const [result, setResult] = useState();

  const post_article = () => {
    Fetch('http://localhost:82/api/articles', {
      method: 'POST',
      body: new FormData(document.forms[0])
    })
    .then((articles) => {
      props.setArticles(articles);
      props.setStatus('Articles');
    })
    .catch(() => setResult('Your article was not posted.'))
  }

  const update_article = () => {
    Fetch(`http://localhost:82/api/articles/${props.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `title=${title}&content=${content}&category_id=${category_id}&image_id_for_thumbnail=${image_id_for_thumbnail}`
    })
    .then((articles) => {
      props.setArticles(articles);
      props.setStatus('Articles');
    })
    .catch(() => setResult('Your article was not updated.'))
  }

  const register_as_draft = () => {
    Fetch('http://localhost:82/api/drafts', {
      method: 'POST',
      body: new FormData(document.forms[0])
    })
    .then((drafts) => {
      props.setStatus('Drafts');
    })
    .catch(() => setResult('Your article was not registered as draft.'))
  }

  const change_article_to_draft = () => {
    fetch('http://localhost:82/api/drafts', {
        method: 'POST',
        body: new FormData(document.forms[0])
    })
    .then(res => res.json())
    .then(json => {
      props.setDrafts(json)
    });

    fetch(`http://localhost:82/api/articles/${props.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(json => {
      props.setArticles(json)
    });

    props.setStatus('Drafts');
  }

  const update_draft = () => {
    fetch(`http://localhost:82/api/drafts/${props.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `title=${title}&content=${content}&category_id=${category_id}&image_id_for_thumbnail=${image_id_for_thumbnail}`
    })
    .then(res => res.json())
    .then((json) => {
      props.setDrafts(json);
      props.setStatus('Drafts');
    })
    .catch(() => setResult('Your draft was not updated.'))
  }

  const post_draft = () => {
    fetch('http://localhost:82/api/articles', {
        method: 'POST',
        body: new FormData(document.forms[0])
    })
    .then(res => res.json())
    .then(json => {
      props.setArticles(json)
    });

    fetch(`http://localhost:82/api/drafts/${props.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(json => {
      props.setDrafts(json)
    });

    props.setStatus('Articles');
  }

  return (
    <>
      <div>
        <a href="https://pandao.github.io/editor.md/en.html" target="_blank">markdown editor</a>
      </div> 
      <form>
        {result}
        <Input 
          label="title"
          type="text" 
          name="title" 
          value={title} 
          onChange={updateTitle} 
          ref={title_ref} 
          error={errors[0]} 
          conditions={['required']}
        />
        <Textarea 
          label="content"
          name="content" 
          value={content} 
          onChange={updateContent} 
          ref={content_ref} 
          error={errors[1]} 
          conditions={['required']}
        />
        <Select
          label="category"
          name="category_id"
          onChange={updateCategoryId} 
          value={category_id}
          children={
            categories.map((element, index) => { 
              return <option key={index} value={element.id}>{element.name}</option>                
            })
          }
        />
        <Select
          label="thumbnail"
          name="image_id_for_thumbnail" 
          onChange={updateImageIdForThumbnail} 
          value={image_id_for_thumbnail}
          children={
            images.map((element, index) => {
              return <option key={index} value={element.id}>{element.name}</option> 
            })
          }
        />
        {props.status == 'Create article' ? 
          <>
            <Submit 
              value="post article" 
              following_process={post_article}
              setErrors={setErrors} 
              validation_elements={[title_ref, content_ref]} 
            />
            <Submit 
              value="register as draft" 
              following_process={register_as_draft}
              setErrors={setErrors} 
              validation_elements={[title_ref, content_ref]} 
            />
          </>
          : props.status == 'Edit article' ?
          <>
            <Submit 
              value="update article" 
              following_process={update_article}
              setErrors={setErrors} 
              validation_elements={[title_ref, content_ref]} 
            />
            <Submit 
              value="change article to draft" 
              following_process={change_article_to_draft}
              setErrors={setErrors} 
              validation_elements={[title_ref, content_ref]} 
            />
          </>
          : props.status == 'Edit draft' ?
          <>
            <Submit 
              value="update draft" 
              following_process={update_draft}
              setErrors={setErrors} 
              validation_elements={[title_ref, content_ref]} 
            />
            <Submit 
              value="post draft" 
              following_process={post_draft}
              setErrors={setErrors} 
              validation_elements={[title_ref, content_ref]} 
            />
          </>
          :
          <></>
        }
      </form>
    </>
  );
}