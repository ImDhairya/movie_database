import {ApiError} from "../../utils/api-error.js";
import {APiResponse} from "../../utils/api-response.js";
import {asyncHandler} from "../../utils/asyncHandler.js";
import prisma from "../../db/dbConnect.js";

export const addMovie = asyncHandler(async (req, res) => {
  const {title, type, director, budget, location, duration, year, userId} =
    req.body;

  const movie = await prisma.movie.create({
    data: {
      title,
      type,
      director,
      budget,
      location,
      duration,
      year,
      userId,
    },
  });

  if (!movie) {
    throw new ApiError("Error in creating a movie", 400);
  }

  return res
    .status(201)
    .json(new APiResponse(201, movie, "Movie created successfully."));
});

export const paginatedMovies = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  if (
    isNaN(pageNumber) ||
    isNaN(limitNumber) ||
    pageNumber < 1 ||
    limitNumber < 1
  ) {
    throw new ApiError("Invalid pagination parameters", 400);
  }

  const skip = (pageNumber - 1) * limitNumber;

  const totalMovies = await prisma.movie.count();

  const movies = await prisma.movie.findMany({
    skip,
    take: limitNumber,
    orderBy: {year: "desc"},
  });

  const totalPages = Math.ceil(totalMovies / limitNumber);

  return res.status(200).json(
    new APiResponse(
      200,
      {
        currentPage: pageNumber,
        totalPages,
        totalMovies,
        movies,
      },
      "Movies fetched successfully"
    )
  );
});
export const updateMovieList = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const {title, type, director, budget, location, duration, year} = req.body;

  const existingMovie = await prisma.movie.findUnique({
    where: {id: parseInt(id)},
  });

  if (!existingMovie) {
    throw new ApiError("Movie not found", 404);
  }

  const updatedMovie = await prisma.movie.update({
    where: {id: parseInt(id)},
    data: {
      title,
      type,
      director,
      budget,
      location,
      duration,
      year,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedMovie, "Movie updated successfully"));
});

export const deleteMovie = asyncHandler(async (req, res) => {
  const {id} = req.params;

  const movieId = parseInt(id, 10);

  if (isNaN(movieId)) {
    throw new ApiError("Invalid movie ID", 400);
  }

  const existingMovie = await prisma.movie.findUnique({
    where: {id: movieId},
  });

  if (!existingMovie) {
    throw new ApiError("Movie not found", 404);
  }

  await prisma.movie.delete({
    where: {id: movieId},
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Movie deleted successfully"));
});
