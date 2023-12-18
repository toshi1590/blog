import { Link, useLocation } from 'react-router-dom';
import BlogPageModule from '../css/BlogPage.module.css';
import { ArticlePage } from './ArticlePage';
import { ArticlesInBlogPage } from './ArticlesInBlogPage';
import { Pagination } from './Pagination';
import { useState } from "react";
import { useFetch } from './useFetch';

export const BlogPage = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const the_number_of_elements_per_page = 6;
  const categories = useFetch('http://localhost:82/api/articles/categories');
  const months = useFetch('http://localhost:82/api/articles/months');

  return (
    <>
      <div className={BlogPageModule.page}>
        <div className={BlogPageModule.main}>
          {new RegExp(/\/articles\/\d+$/).test(location.pathname) == true ? (
            // case of /articles/id
            <ArticlePage />
          ) : (
            // cases of /articles/category and /articles/year/month
            <>
              <ArticlesInBlogPage 
                page={page} 
                articles={articles} 
                setArticles={setArticles} 
                the_number_of_elements_per_page={the_number_of_elements_per_page} 
              />
              <Pagination 
                the_number_of_elements={articles.length} 
                page={page} 
                setPage={setPage} 
                the_number_of_elements_per_page={the_number_of_elements_per_page} 
              />
            </>
          )}
        </div>
        <div className={BlogPageModule.sidebar}>
          <div>
            <Link to="/articles">all (number)</Link>
          </div>
          <div>            
            <b>category</b>
            {categories.map((element, index) => {
              return (
                <div key={index}>
                  <Link to={`/articles/${element.name}`}>{element.name} ({element.number})</Link>
                </div>
              )
            })}
          </div>
          <div>
            <b>archive</b>
            {months.map((element, index) => {
              return (
                <div key={index}>
                  <Link to={`/articles/${element.month}`}>{element.month} ({element.record_count})</Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}