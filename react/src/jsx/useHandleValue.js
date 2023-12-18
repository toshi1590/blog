import { useState } from "react";

export const useHandleValue = (initial_value) => {
  const [value, setValue] = useState(initial_value);
  
  const updateValue = (e) => {
    setValue(e.target.value) 
  }

  return [value, setValue, updateValue];
};
