import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";

class AppError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Se for um AppError (erro conhecido)
  if (err instanceof AppError) {
    logger.warn(`Handled error: ${err.message}`);
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Para erros inesperados
  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });
  console.error(err.stack);

  return res.status(500).json({
    error: "Ocorreu um erro interno no servidor",
  });
};

export { AppError, errorHandler };
