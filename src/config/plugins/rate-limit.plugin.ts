import rateLimit from 'express-rate-limit';

export const limitRequest = (maxRequests: number, windowMinutes: number, message: string) => {
  return rateLimit({
    max: maxRequests,
    windowMs: windowMinutes * 60 * 1000,
    message: message
  })
}