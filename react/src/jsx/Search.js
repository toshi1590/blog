export const Search = (data, key, keyword) => {  
  const result = data.filter(element => element[key] == keyword)
  return result;
};