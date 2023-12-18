import { useEffect } from "react";
import {Del} from './Del';
import {Table} from './Table';
import TableModule from '../css/Table.module.css';

export const DraftsInAdminPage = (props) => {
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:82/api/drafts');
      const json = await res.json();
      props.setDrafts(json);
    })();
  }, []);

  const get_tds = () => {
    const tds = props.drafts.map((element, index) => {
      return (
        <tr key={index + 1} className={TableModule.tr}>
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
              props.setThumbnailUrl(element.thumbnail_url);
              props.setStatus('Edit draft');
            }}>edit</button>
          </td>
          <td className={TableModule.td}>
            <button className={TableModule.delete_btn} onClick={() => {Del(
              `Are you sure to delete draft "${element.title}"?`, 
              `http://localhost:82/api/drafts/${element.id}`, 
              props.setDrafts 
            )}}>delete</button>
          </td>
        </tr>
      )
    }) 

    return tds;
  }

  return (  
    <>
      <Table 
        ths={['index', 'title', 'category', 'created_at', '', '']} 
        tds={get_tds()}
      />
    </>    
  );
}