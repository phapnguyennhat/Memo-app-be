import * as Joi from 'joi';

export const validationSchema = Joi.object({
  POSTGRES_URL: Joi.string().required(),
  // POSTGRES_HOST: Joi.string().required(),
  // POSTGRES_PORT: Joi.number().required(),
  // POSTGRES_USER: Joi.string().required(),
  // POSTGRES_PASSWORD: Joi.string().required(),
  // POSTGRES_DB: Joi.string().required(),
  PORT: Joi.number().required(),

  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),

  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
});
