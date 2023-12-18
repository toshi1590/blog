export const Del = (message, url, setstate) => {
  const answer = window.confirm(message);

  if (answer == true) {
    (async () => {
      const res = await fetch(url, {
        method: 'DELETE'
      });
      const json = await res.json();
      setstate(json);
    })();
  }  
};
