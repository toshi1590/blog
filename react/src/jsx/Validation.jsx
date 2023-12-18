const check_required = (input_value) => {
  if (input_value != '') {
    return true;
  } else {
    return false;
  }
}

const check_onlytext = (input_value) => {
  if (/^[a-zA-Z]*$/.test(input_value)) {
    return true;
  } else {
    return false;
  }
}

export function Validation (refs) {
  // const check_required = (input_value) => {
  //   if (input_value != '') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // const check_textonly = (input_value) => {
  //   if (/^[a-zA-Z]*$/.test(input_value)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  let errors = [];

  if (Array.isArray(refs)) {
    refs.forEach(ref => {
      let flag;
      const conditions = ref.current.dataset.conditions.split(',');
  
      for (let i = 0; i < conditions.length; i++) {
        if (conditions[i] == 'required') {
          flag = check_required(ref.current.value);
  
          if (!flag) {
            errors = [...errors, 'required'];
          }
        } else if (conditions[i] == 'onlytext') {
          flag = check_onlytext(ref.current.value);
  
          if (!flag) {
            errors = [...errors, 'onlytext'];
          }
        }
  
        if (!flag) {
          break;
        } 
      }
  
      if (flag == true) {
        errors = [...errors, ''];
      }
    })  
  }

  return errors;
}
