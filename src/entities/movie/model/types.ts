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

/**
 * Тип актёра из credits
 */
export type CastMember = {
  id: number
  name: string
  character: string
  profile_path: string | null
}

/**
 * Тип члена экипажа (режиссёр, сценарист и т.д.)
 */
export type CrewMember = {
  id: number
  name: string
  job: string
  profile_path: string | null
}

/**
 * Тип жанра
 */
export type GenreInfo = {
  id: number
  name: string
}

/**
 * Тип страны производства
 */
export type ProductionCountry = {
  iso_3166_1: string
  name: string
}

/**
 * Тип языка
 */
export type SpokenLanguage = {
  iso_639_1: string
  name: string
}

/**
 * Тип компании-производителя
 */
export type ProductionCompany = {
  id: number
  name: string
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
  genres: GenreInfo[]
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  credits: {
    cast: CastMember[]
    crew: CrewMember[]
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
