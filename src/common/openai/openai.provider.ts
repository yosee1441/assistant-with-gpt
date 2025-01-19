import OpenAI from 'openai';

import { envs } from '@/common';
import { PROVIDER_OPENAI } from './utils';

export const OpenAiProvider = {
  provide: PROVIDER_OPENAI,
  useFactory: () => {
    return new OpenAI({
      apiKey: envs.openAiApiKey,
    });
  },
};
