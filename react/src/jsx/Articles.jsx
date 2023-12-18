import { useLocation, useNavigate } from 'react-router-dom';
import ArticlesModule from '../css/Articles.module.css';
import { useEffect } from "react";

export const Articles = (props) => {
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
       <div className={ArticlesModule.articles}>
        {props.articles.map((element, index) => {
          if (index >= (props.page - 1) * props.the_number_of_elements_per_page && index < (props.page * props.the_number_of_elements_per_page)) {
            return (
              <div key={index} className={ArticlesModule.article} onClick={() => {navigate(`/articles/${element.id}`)}}>
                <img className={ArticlesModule.thumbnail} src={`http://localhost:82/api/images/${element.id}`} alt="" />
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