export const getRelevantContext = async (question) => {
  return `
La Universidad Autónoma de Santo Domingo (UASD) es una institución pública de educación superior de la República Dominicana.

El Estatuto Orgánico establece la organización, principios, fines, funciones y órganos de gobierno de la Universidad.

Pregunta del usuario: ${question}
  `;
};