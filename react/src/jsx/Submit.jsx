import {Validation} from './Validation';

export const Submit = (props) => {
  const submit = (e) => {
    e.preventDefault();

    props.setErrors(Validation(props.validation_elements));

    props.setErrors(errors => {
      const flag = errors.every(element => element == '');

      if (flag) {
        (props.following_process)();
      } 

      // need to return
      return errors;
    })
  }

  return (
    <>
      <div>
        <input 
          style={{
            width: '100%',
            marginBottom: '5px'
          }}
          type="submit" 
          value={props.value} 
          onClick={submit} 
        />
      </div>
    </>
  );
};
