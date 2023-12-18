import { useEffect } from 'react';
import {Fetch} from './Fetch';
import {Del} from './Del';
import {Table} from './Table';
import TableModule from '../css/Table.module.css';

export const ArticlesInAdminPage = (props) => {
  useEffect(() => {
    Fetch('http://localhost:82/api/articles', {})
    .then(articles => {
      props.setArticles(articles);
    })   
  }, []);

  const get_tds = () => {
    const tds = props.articles.map((element, index) => {
      if (index >= (props.page - 1) * props.the_number_of_elements_per_page && index < (props.page * props.the_number_of_elements_per_page)) {
        return(
          <tr key={index} className={TableModule.tr}>
            <td className={TableModule.td}>{index + 1}</td>
            <td className={TableModule.td}>{element.title}</td>
            <td className={TableModule.td}>{element.category}</td>
            <td className={TableModule.td}>{element.created_at}</td>
            <td className={TableModule.td}>
              <button className={TableModule.edit_btn} onClick={() => {
                props.setId(element.id);
                props.setTitle(element.title);
                props.setContent(element.content);
                props.setCategoryId(element.category_id);
                props.setImageIdForThumbnail(element.image_id_for_thumbnail);
                props.setStatus('Edit article');
              }}>edit</button>
            </td>
            <td className={TableModule.td}>
              <button className={TableModule.delete_btn} onClick={() => {Del(
                `Are you sure to delete article "${element.title}"?`,
                `http://localhost:82/api/articles/${element.id}`,
                props.setArticles
              )}}>delete</button>
            </td>    
          </tr>
        )
      }
    })

    return tds;
  }

  return (  
    <>
      <button onClick={() => {props.setStatus('Create article');}}>create an article</button>

      <Table 
        ths={['index', 'title', 'category', 'created_at', '', '']} 
        tds={get_tds()}
      />
    </>
  );
}