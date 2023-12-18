import { useLocation, useNavigate } from 'react-router-dom';
import ArticlesInBlogPageModule from '../css/ArticlesInBlogPage.module.css';
import { useEffect } from "react";

export const ArticlesInBlogPage = (props) => {
  const location = useLocation();  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:82/api${location.pathname}`)
    // fetch(` http://www.iris-real-estate.net:82/api${location.pathname}`)
    .then((res) => {
      return res.json();
    })
    .then(json => {
      props.setArticles(json);
    })
  }, [location.pathname])

  return (
    <>
       <div className={ArticlesInBlogPageModule.articles}>
        {props.articles.map((element, index) => {
          if (index >= (props.page - 1) * props.the_number_of_elements_per_page && index < (props.page * props.the_number_of_elements_per_page)) {
            return (
              <div key={index} className={ArticlesInBlogPageModule.article} onClick={() => {navigate(`/articles/${element.id}`)}}>
                <img className={ArticlesInBlogPageModule.thumbnail} src={`http://localhost:82/api/images/${element.id}`} alt="" />
                <div>title: {element.title}</div>
                <div>category: {element.category}</div>
                <div>date: {element.created_at}</div>
              </div>
            ); 
          }
        })}
      </div>
    </>
  );
}