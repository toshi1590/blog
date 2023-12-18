import { forwardRef } from "react";

export const Textarea = forwardRef((props, ref) => {
  return (
    <>
      <div>
        <div>
          <label htmlFor={props.label}>{props.label}</label>
          <span style={{color: 'red'}}>{props.error}</span>
        </div>
        <div>
          <textarea  
            style={{
              width: '100%', 
              height: '200px', 
              boxSizing: 'border-box',
              marginBottom: '5px'
            }} 
            name={props.name}
            value={props.value}
            ref={ref} 
            data-conditions={props.conditions}
            onChange={props.onChange}
            className={props.className}
          />
        </div>
      </div>
    </>
  );
});
