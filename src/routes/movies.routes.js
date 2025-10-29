import {Router} from "express";
import {
  addMovie,
  deleteMovie,
  paginatedMovies,
  updateMovieList,
} from "../controllers/movies.controller.js";
import {validate} from "../middleware/validate.js";
import {movieSchema, updateMovieSchema} from "../../utils/validators.js";

const router = Router();

router.post("/", validate(movieSchema), addMovie);

router.get("/", paginatedMovies);

router.patch("/:id", validate(updateMovieSchema), updateMovieList);

router.delete("/:id", deleteMovie);

export default router;
