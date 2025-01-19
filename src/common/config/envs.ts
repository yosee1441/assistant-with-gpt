import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  NODE_ENV: string;
  PORT: number;
  OPENAI_API_KEY: string;
}

const envsSchema = joi
  .object<EnvVars>({
    NODE_ENV: joi.string().required(),
    PORT: joi.number().required(),
    OPENAI_API_KEY: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  openAiApiKey: envVars.OPENAI_API_KEY,
};
