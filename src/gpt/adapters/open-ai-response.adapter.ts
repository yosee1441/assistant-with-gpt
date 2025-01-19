export const openAiResponseAdapter = (response: string) => {
  try {
    return JSON.parse(response);
  } catch (error) {
    throw new Error('La respuesta de OpenAI no es un JSON válido.');
  }
};
