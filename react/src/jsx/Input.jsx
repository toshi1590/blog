import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  return (
    <>
      <div>
        <div>
          <label htmlFor={props.label}>{props.label}</label>
          <span style={{color: 'red'}}> {props.error}</span>
        </div>
        <div>
          <input 
            style={{
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '5px'
            }}
            type={props.type} 
            name={props.name}
            value={props.value}
            ref={ref} 
            data-conditions={props.conditions}
            onChange={props.onChange}
            className={props.className}
            defaultValue={props.defaultValue}
          />
        </div>
      </div>
    </>
  );
});
