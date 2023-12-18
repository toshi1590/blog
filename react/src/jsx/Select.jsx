import { forwardRef } from "react";

export const Select = forwardRef((props, ref) => {
  return (
    <>
      <div>
        <div>
          <label htmlFor={props.label}>{props.label}</label>
          <span style={{color: 'red'}}> {props.error}</span>
        </div>
        <div>
          <select 
            style={{
              width: '100%',
              marginBottom: '5px'
            }} 
            name={props.name}
            ref={ref} 
            data-conditions={props.conditions}
            onChange={props.onChange}
            className={props.className}
            value={props.value}
          >
            {props.children}
          </select>
        </div>
      </div>
    </>
  );
});
