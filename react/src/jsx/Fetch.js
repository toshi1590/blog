export const Fetch = async (url, request) => {
  return fetch(url, request).then(res => res.json())
};

// export const Fetch = async (url, request) => {  
//   const res = await fetch(url, request);
//   const json = await res.json();
//   return json;
// };