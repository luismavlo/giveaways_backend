import 'dotenv/config';
import env from 'env-var';

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  NODE_ENV: env.get('NODE_ENV').required().asString(),

  SECRET_JWT_SEED: env.get('SECRET_JWT_SEED').required().asString(),
  JWT_EXPIRE_IN: env.get('JWT_EXPIRE_IN').required().asString(),

  DISCORD_CLIENT_ID: env.get('DISCORD_CLIENT_ID').required().asString(),
  DISCORD_CLIENT_SECRET: env.get('DISCORD_CLIENT_SECRET').required().asString(),
  DISCORD_REDIRECT_URI: env.get('DISCORD_REDIRECT_URI').required().asString(),
}