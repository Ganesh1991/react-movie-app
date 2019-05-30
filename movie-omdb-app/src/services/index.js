import { async } from "q";

export const searchMovieTitle = async (title, apiUrl) => {
  const response = await fetch(apiUrl + "&s=" + title);
  const data = await response.json();
  return data;
};
export const getMovieByID = async (id, apiUrl) => {
  const response = await fetch(apiUrl + `&plot=full&i=${id}`);
  const data = await response.json();
  return data;
};

export const searchMoviebyYearAndTitle = async (apiUrl, name, year, page) => {
  const response = await fetch(
    apiUrl + `&s=${name}&page=${page}&type=movie&y=${year}`
  );
  //http://www.omdbapi.com/?s=batman&apikey=9bec5fc4&page=2&type=movie&y=2013
  return await response.json();
  // let response = null;
  // if (name != null && year !== null) {
  //   response = await fetch(
  //     apiUrl + `&t=${name}&page=${page}&type=movie&y=${year}`
  //   );
  //   return await response.json();
  // } else if (name != null) {
  //   response = await fetch(apiUrl + `&t=${name}&page=${page}&type=movie`);
  //   return await response.json();
  // } else {
  // }
  // http://www.omdbapi.com/?t=shawshank&y=2013&plot=full
};

export const getMovies = async (apiUrl, page) => {
  console.log("TCL: getMovies -> apiUrl", apiUrl);

  const response = await fetch(apiUrl + `&s=abc&page=${page}&type=movie`);
  const data = await response.json();
  return data;
  //http://www.omdbapi.com/?s=abc&page=2&type=movie
};
