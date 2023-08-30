import axios from 'axios';

const TMDB_KEY = '8cc46c9405f717ccf8073beaa35ce6f7';

const makeRequest = (path: string, params: object) => {
  return axios.get(`https://api.themoviedb.org/3${path}`, {
    params: {
      ...params,
      api_key: TMDB_KEY,
    }
  })
}


const getAnything = async (path, params = {}) => {
  try {
    const {
      data: { results },
      data
    } = await makeRequest(path, params);
    return [results || data, null];
  } catch (e) {
    return [null, e];
  }
};

export const movieApi = {
  nowPlaying: () => getAnything("/movie/now_playing"),
  popular: () => getAnything("/movie/popular"),
  upcoming: () => getAnything("/movie/upcoming"),
  search: query => getAnything("/search/movie", { query }),
  movie: id => getAnything(`/movie/${id}`),
  discover: () => getAnything("/discover/movie")
};

export const tvApi = {
  today: () => getAnything("/tv/on_the_air"),
  thisWeek: () => getAnything("/tv/on_the_air"),
  topRated: () => getAnything("/tv/top_rated"),
  popular: () => getAnything("/tv/popular"),
  search: query => getAnything("/search/tv", { query }),
  show: id => getAnything(`/tv/${id}`),
};