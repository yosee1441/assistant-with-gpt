import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { envs } from '@/common';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import {
  orthographyCheckUseCase,
  prosConsDicusserUseCase,
  prosConsDicusserStreamUseCase,
} from './use-cases';

@Injectable()
export class GptService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: envs.openAiApiKey,
    });
  }

  async orthographyCheck(dto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, dto);
  }

  async prosConsDiscusser(dto: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, dto);
  }

  async prosConsDiscusserStream(dto: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, dto);
  }
}
