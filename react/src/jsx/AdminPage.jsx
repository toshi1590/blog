import {ArticlesInAdminPage} from './ArticlesInAdminPage';
import {ArticleEditor} from './ArticleEditor';
import {DraftsInAdminPage} from './DraftsInAdminPage';
import {CategoriesInAdminPage} from './CategoriesInAdminPage';
import {CategoryEditor} from './CategoryEditor';
import {ImageEditor} from './ImageEditor';
import {ImagesInAdminPage} from './ImagesInAdminPage';
import {Pagination} from './Pagination';
import AdminPageModule from '../css/AdminPage.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
  const [status, setStatus] = useState('Articles');  
  // articles
  const [articles, setArticles] = useState([]);
  //drafts
  const [drafts, setDrafts] = useState([]);
  // articles and drafts
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category_id, setCategoryId] = useState();
  const [image_id_for_thumbnail, setImageIdForThumbnail] = useState();
  // categories
  const [categories, setCategories] = useState([]);
  //images
  const [images, setImages] = useState([]);
  // pagination
  const [page, setPage] = useState(1);
  const the_number_of_elements_per_page = 5;
  
  useEffect(() => {
    setPage(1);
  }, [status]);

  const navigate = useNavigate();
  const [user, setUser] = useState({id: '', name: '', email: ''});

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((_) => _.startsWith("XSRF-TOKEN")) || "";
    const csrfToken = decodeURIComponent(cookie.split("=")[1]);

    // fetch("http://localhost:8000/profile", {
    fetch("http://localhost:82/profile", {
      method: "GET",
      headers: {
        "X-XSRF-TOKEN": csrfToken,
      },
      credentials: "include",
    })
    .then(res => res.json())
    .then(json => {
      if (json.status == 'success') {
        setUser({...user, id: json.user.id, name: json.user.name, email: json.user.email});
      } else {
        navigate('/login');
      }
    });
  }, [])

  const logout = () => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((_) => _.startsWith("XSRF-TOKEN")) || "";
    const csrfToken = decodeURIComponent(cookie.split("=")[1]);

    // fetch("http://localhost:8000/logout", {
    fetch("http://localhost:82/logout", {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": csrfToken,
      },
      credentials: "include",
    })
    .then(() => navigate('/login'))
    .catch(error => console.error(error))
  }

  return (
    <>  
      <div className={AdminPageModule.page}>
        <div className={AdminPageModule.main}>
          <h1>{status}</h1>
          {status == 'Articles' ? 
            <>
              <ArticlesInAdminPage
                setStatus={setStatus}   
                articles={articles} 
                setArticles={setArticles} 
                setId={setId} 
                setTitle={setTitle} 
                setContent={setContent} 
                setCategoryId={setCategoryId} 
                setImageIdForThumbnail={setImageIdForThumbnail}
                page={page}
                the_number_of_elements_per_page={the_number_of_elements_per_page}
              />
              <Pagination 
                the_number_of_elements={articles.length} 
                page={page} 
                setPage={setPage} 
                the_number_of_elements_per_page={the_number_of_elements_per_page} 
              />
            </>
            : status == 'Create article' ? 
            <ArticleEditor
              status={status} 
              setStatus={setStatus} 
              setArticles={setArticles} 
              title='' 
              content='' 
              category_id='' 
              image_id_for_thumbnail=''
              setDrafts={setDrafts}
            />
            : status == 'Edit article' ? 
            <ArticleEditor 
              status={status} 
              setStatus={setStatus} 
              setArticles={setArticles} 
              id={id} 
              title={title} 
              content={content} 
              category_id={category_id} 
              image_id_for_thumbnail={image_id_for_thumbnail} 
              setDrafts={setDrafts}
            />
            : status == 'Drafts' ?
            <>
              <DraftsInAdminPage
                setStatus={setStatus}
                drafts={drafts} 
                setDrafts={setDrafts} 
                setId={setId} 
                setTitle={setTitle} 
                setContent={setContent} 
                setCategoryId={setCategoryId} 
                setImageIdForThumbnail={setImageIdForThumbnail}
                page={page}
                the_number_of_elements_per_page={the_number_of_elements_per_page}
              />
              <Pagination 
                the_number_of_elements={drafts.length} 
                page={page} 
                setPage={setPage} 
                the_number_of_elements_per_page={the_number_of_elements_per_page} 
              />
            </>
            : status == 'Edit draft' ?
            <ArticleEditor 
              status={status} 
              setStatus={setStatus} 
              setDrafts={setDrafts} 
              id={id} 
              title={title} 
              content={content} 
              category_id={category_id} 
              image_id_for_thumbnail={image_id_for_thumbnail} 
              setArticles={setArticles}
            />
            : status == 'Categories' ? 
            <>
              <CategoryEditor 
                setCategories={setCategories} 
              />
              <CategoriesInAdminPage
                categories={categories}
                setCategories={setCategories}
                page={page}
                the_number_of_elements_per_page={the_number_of_elements_per_page}
              />
              <Pagination 
                the_number_of_elements={categories.length} 
                page={page} 
                setPage={setPage} 
                the_number_of_elements_per_page={the_number_of_elements_per_page} 
              />
            </>  
            : status == 'Images' ?
            <>
              <ImageEditor
                setImages={setImages}
              />
              <ImagesInAdminPage 
                images={images} 
                setImages={setImages} 
                page={page}
                the_number_of_elements_per_page={the_number_of_elements_per_page}
              />
              <Pagination 
                the_number_of_elements={images.length} 
                page={page} 
                setPage={setPage} 
                the_number_of_elements_per_page={the_number_of_elements_per_page} 
              />
            </>
            : <></>
          }
        </div>
        <div className={AdminPageModule.sidebar}>
          <div className={AdminPageModule.sidebar_item} onClick={() => {setStatus('Articles')}}>articles</div>
          <div className={AdminPageModule.sidebar_item} onClick={() => {setStatus('Drafts')}}>drafts</div>
          <div className={AdminPageModule.sidebar_item} onClick={() => {setStatus('Categories')}}>categories</div>
          <div className={AdminPageModule.sidebar_item} onClick={() => {setStatus('Images')}}>images</div>
          <br />
          <div>
            <div>
              id {user.id}
            </div>
            <div>
              name {user.name}
            </div>
            <div>
              email {user.email}
            </div>
          </div>
          <div className={AdminPageModule.sidebar_item} onClick={() => {logout()}}>logout</div>
        </div>
      </div>
    </>
  );
}