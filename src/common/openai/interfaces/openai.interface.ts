export interface OpenAiResponse {
  id: string;
  object: string;
  created: number;
  choices: Array<{
    text: string;
    index: number;
    logprobs: null | Record<string, any>;
    finish_reason: string;
  }>;
}
