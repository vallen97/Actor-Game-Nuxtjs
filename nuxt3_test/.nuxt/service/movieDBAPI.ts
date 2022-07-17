import { MovieDBTypes } from "../types/movieDBTypes";
import { MoviedbMovieCreditsTypes } from "../types/movieDBMovieCreditsTypes"
import { MovieDBActorMostKnownTypes } from "../types/movieDBActorMostKnownTypes";
const API_KEY: string = "c1ecb17719357a7d73c0ccbcf4600a4a"

export const searchActor = async (search: string): Promise<MovieDBTypes> =>
  await fetch(
    `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${search}&include_adult=false`
  ).then((val) => val.json());

export const getMovieCredits = async (movieID: Number): Promise<MoviedbMovieCreditsTypes> =>
  await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=c1ecb17719357a7d73c0ccbcf4600a4a&language=en-US`
  ).then((val) => val.json());

export const getActorMostKnown = async (actorID: Number): Promise<MovieDBActorMostKnownTypes> =>
  await fetch(
    `https://api.themoviedb.org/3/person/${actorID}/combined_credits?api_key=${API_KEY}&language=en-US`
  ).then((val) => val.json());