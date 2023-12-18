import { createRef, useEffect, useRef, useState } from "react";
import {Del} from './Del';
import {Table} from './Table';
import TableModule from '../css/Table.module.css';

export const CategoriesInAdminPage = (props) => {
  const [editable_rows, setEditableRows] = useState([]);
  const input_refs = useRef([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:82/api/categories');
      // const res = await fetch('http://www.iris-real-estate.net:82/api/categories');
      const json = await res.json();
      props.setCategories(json);
    })();
  }, []);

  const edit = (index) => {
    input_refs.current[index].current.removeAttribute("readOnly");
    setEditableRows([...editable_rows, index]);
  }
  
  const handle_value = (e, edit_index) => {
    props.setCategories(
      props.categories.map((element, index) => {
        if (index == edit_index) {
          element.name = e.target.value;
          return element;
        } else {
          return element;
        }
      })
    )
  }

  const update = (index, id) => {
    fetch(`http://localhost:82/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `name=${props.categories[index].name}`
    })
    .then(res => res.json())
    .then(json => {
      props.setCategories(json);
      input_refs.current[index].current.setAttribute('readOnly', true);
      setEditableRows(editable_rows => editable_rows.filter(element => element != index));
    })
  } 

  const get_tds = () => {
    const tds = props.categories.map((element, index) => {
      input_refs.current.push(createRef());

      if (index >= (props.page - 1) * props.the_number_of_elements_per_page && index < (props.page * props.the_number_of_elements_per_page)) {
        return (
          <tr key={index} className={TableModule.tr}>
            <td className={TableModule.td}>{index + 1}</td>
            <td className={TableModule.td}>
              <input type="text" ref={input_refs.current[index]} value={element.name} onChange={(e) => {handle_value(e, index)}} readOnly />  
            </td>
            <td className={TableModule.td}>
              {editable_rows.includes(index) ? (
                <button className={TableModule.update_btn} onClick={() => update(index, element.id)}>update</button>
              ) : (
                <button className={TableModule.edit_btn} onClick={() => edit(index)}>edit</button>
              )}
            </td>
            <td className={TableModule.td}>
              <button className={TableModule.delete_btn} onClick={() => {Del(
                `Are you sure to delete category "${element.name}"?`, 
                `http://localhost:82/api/categories/${element.id}`, 
                props.setCategories 
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
      <Table 
        ths={['index', 'name', '', '']} 
        tds={get_tds()}
      />
    </>   
  );
}