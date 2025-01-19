import OpenAI from 'openai';
import { openAiResponseAdapter } from '@/gpt/adapters';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  option: Options,
) => {
  const { prompt } = option;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
          Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
          Las palabras usadas deben de existir en el diccionario de la real academia Española,
          Debes de responder en formato JSON,
          tu tarea es de corregirlos y retornar información soluciones,
          tambien debes de dar un porcentaje de acierto por el usuario,

          si no hay errores, debes de retornar un mensaje de felicitaciones.

          Ejemplo de salida:
          {
            userScore: number,
            errors: string[], // ['error -> solución']
            message: string, // Usa emojis y texto para felicitar al usuario
          }
        `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-4o',
    temperature: 0.3,
    max_tokens: 100,
  });

  return openAiResponseAdapter(completion.choices[0].message.content);
};
