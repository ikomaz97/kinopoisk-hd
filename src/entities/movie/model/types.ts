/**
 * Типы для работы с фильмами
 */

export type Movie = {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  popularity: number
  genre_ids?: number[]
}

export type MovieDetails = {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  runtime: number
  genres: { id: number; name: string }[]
  production_companies: { id: number; name: string }[]
  production_countries: { iso_3166_1: string; name: string }[]
  spoken_languages: { iso_639_1: string; name: string }[]
  credits: {
    cast: {
      id: number
      name: string
      character: string
      profile_path: string | null
    }[]
    crew: {
      id: number
      name: string
      job: string
      profile_path: string | null
    }[]
  }
  videos: {
    results: {
      id: string
      key: string
      site: string
      type: string
      name: string
    }[]
  }
}

export type MovieSearchResult = {
  page: number
  total_results: number
  total_pages: number
  results: Movie[]
}

/**
 * Тип для возврата фильмов с информацией о пагинации
 */
export type MoviesWithPagination = {
  movies: Movie[]
  totalPages: number
  totalResults: number
}

/**
 * Тип жанра из TMDB API
 */
export type Genre = {
  id: number
  name: string
}

/**
 * Ответ API с списком жанров
 */
export type GenreListResponse = {
  genres: Genre[]
}
