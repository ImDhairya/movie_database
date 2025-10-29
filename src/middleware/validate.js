
export const validate = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);
console.log(req,"FEHIji")
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  req.body = parsed.data;
  next();
};
