import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() dto: OrthographyDto) {
    try {
      return this.gptService.orthographyCheck(dto);
    } catch (error) {
      throw new Error('Orthography check failed. Please try again later.');
    }
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(@Body() dto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDiscusser(dto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(
    @Body() dto: ProsConsDiscusserDto,
    @Res() response: Response,
  ) {
    const stream = await this.gptService.prosConsDiscusserStream(dto);

    response.setHeader('Content-Type', 'application/json');
    response.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0]?.delta?.content || '';
      response.write(piece);
    }

    response.end();
  }
}
