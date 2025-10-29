import * as z from "zod";


export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["Movie", "TV Show"], {
    errorMap: () => ({message: "Type must be either 'Movie' or 'TV Show'"}),
  }),
  director: z.string().min(1, "Director is required"),
  budget: z.number().nonnegative("Budget must be non-negative"),
  location: z.string().min(1, "Location is required"),
  duration: z.number().positive("Duration must be greater than 0"),
  year: z
    .number()
    .int()
    .min(1888, "Year must be realistic (first film was 1888)")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  userId: z.number().int().positive("User ID is required"),
});


export const updateMovieSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  type: z
    .enum(["Movie", "TV Show"], {
      errorMap: () => ({message: "Type must be either 'Movie' or 'TV Show'"}),
    })
    .optional(),
  director: z.string().min(1, "Director is required").optional(),
  budget: z.number().nonnegative("Budget must be non-negative").optional(),
  location: z.string().min(1, "Location is required").optional(),
  duration: z.number().positive("Duration must be greater than 0").optional(),
  year: z
    .number()
    .int()
    .min(1888, "Year must be realistic (first film was 1888)")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .optional(),
  userId: z.number().int().positive("User ID is required").optional(),
});


export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
});
