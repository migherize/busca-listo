import { useState, useEffect } from 'react';
import { buildApiUrl } from '@/config';

interface ApiStatus {
  isAvailable: boolean;
  isChecking: boolean;
  lastChecked: Date | null;
  error: string | null;
}

export function useApiStatus() {
  const [status, setStatus] = useState<ApiStatus>({
    isAvailable: true, // Asumimos que está disponible por defecto
    isChecking: false,
    lastChecked: null,
    error: null,
  });

  const checkApiStatus = async () => {
    setStatus(prev => ({ ...prev, isChecking: true, error: null }));
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout
      
      const response = await fetch(buildApiUrl("/health"), { 
        signal: controller.signal,
        method: 'HEAD'
      });
      
      clearTimeout(timeoutId);
      
      setStatus({
        isAvailable: response.ok,
        isChecking: false,
        lastChecked: new Date(),
        error: null,
      });
    } catch (error) {
      setStatus({
        isAvailable: false,
        isChecking: false,
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  useEffect(() => {
    // Verificar estado inicial
    checkApiStatus();
    
    // Verificar cada 30 segundos
    const interval = setInterval(checkApiStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    ...status,
    checkApiStatus,
    // Helper para mostrar mensajes al usuario
    getStatusMessage: () => {
      if (status.isChecking) return "Verificando conexión...";
      if (status.isAvailable) return "Conectado a la API";
      return "Usando datos locales (API no disponible)";
    },
    // Helper para mostrar indicador visual
    getStatusIndicator: () => {
      if (status.isChecking) return "🔄";
      if (status.isAvailable) return "🟢";
      return "🟡";
    },
  };
}
