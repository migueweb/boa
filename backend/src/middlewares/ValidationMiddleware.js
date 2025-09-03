import { z } from "zod";

/**
 * Middleware factory to validate request payloads with Zod.
 *
 * @param {import("zod").ZodSchema} schema - The Zod schema to validate against.
 * @param {"body" | "query" | "params"} [location="body"] - Which part of the request to validate.
 */
export function validate(schema, location = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[location]);

    if (!result.success) {
      const { formErrors, fieldErrors } = z.flattenError(result.error);

      return res.error("Validation error", 400, {
        formErrors,
        fieldErrors,
      });
    }

    // overwrite with validated + parsed data
    req[location] = result.data;
    next();
  };
}
