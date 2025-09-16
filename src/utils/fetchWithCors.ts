/**
 * Función helper para hacer requests con configuración CORS correcta
 * Soluciona problemas de CORS en producción
 */
export async function fetchWithCors(url: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': window.location.origin,
      ...options.headers,
    },
    mode: 'cors',
    credentials: 'omit', // No enviar cookies para evitar problemas CORS
  };

  const mergedOptions = { ...defaultOptions, ...options };
  
  console.log("fetchWithCors - URL:", url);
  console.log("fetchWithCors - Options:", mergedOptions);

  try {
    const response = await fetch(url, mergedOptions);
    
    console.log("fetchWithCors - Response status:", response.status, response.statusText);
    console.log("fetchWithCors - Response headers:", Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("fetchWithCors - Error response:", errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log("fetchWithCors - Data received:", data);
    return data;
    
  } catch (error) {
    console.error("fetchWithCors - Fetch error:", error);
    throw error;
  }
}
