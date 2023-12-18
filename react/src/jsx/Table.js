import TableModule from '../css/Table.module.css';

export const Table = (props) => {
  return (
    <table className={TableModule.table}>
      <thead className={TableModule.thead}>
        <tr>
          {props.ths.map((element, index) => <th key={index} className={TableModule.td}>{element}</th>)}
        </tr>
      </thead>
      <tbody>
        {props.tds}
      </tbody>
    </table>
  );
};