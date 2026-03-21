/**
 * Application-specific error class.
 * Thrown intentionally in services/repos when something goes wrong.
 * Caught by the global error handler middleware.
 *
 * Why a separate file?
 * - Prevents circular imports (errorHandler ↔ services)
 * - Single source of truth for error shape
 * - Can be imported by any layer without coupling
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}
