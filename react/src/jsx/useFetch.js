import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(json => {
      setData(json)
    })
  }, []);

  return data;
};
