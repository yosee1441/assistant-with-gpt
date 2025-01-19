import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';
import { CATALOG } from '@/utils';

export class OrthographyDto {
  @IsString({
    context: {
      code: CATALOG.GPT0001,
    },
  })
  readonly prompt: string;

  @IsInt({
    context: {
      code: CATALOG.GPT0002,
    },
  })
  @Min(1, {
    context: {
      code: CATALOG.GPT0003,
    },
  })
  @Max(100, {
    context: {
      code: CATALOG.GPT0004,
    },
  })
  @IsOptional()
  readonly maxTokens?: number;
}
