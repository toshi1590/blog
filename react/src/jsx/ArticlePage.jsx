import ArticlePageModule from '../css/ArticlePage.module.css';
import { useLocation } from "react-router-dom";
import Markdown from 'react-markdown';
import { useEffect, useState } from 'react';

export const ArticlePage = () => {
  const location = useLocation();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:82/api${location.pathname}`);
      const json = await res.json();
      setArticle(json);
    })();
  }, []);

  return (
    <>
      <div style={{margin: '10px'}}>      
        {article.map((element, index) => {
          return (
            <div key={index}>
              <div className={ArticlePageModule.title}>{element.title}</div>
              <img className={ArticlePageModule.thumbnail} src={`http://localhost:82/api/images/${element.image_id_for_thumbnail}`} alt="oops" />
              <div>posted on {element.created_at}</div>
              <div className='markdown'>
                <Markdown>{element.content}</Markdown>  
              </div>
            </div>
          )
        })}
      </div>     
    </>
  );
}