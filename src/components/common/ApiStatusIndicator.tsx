import { useApiStatus } from "@/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function ApiStatusIndicator() {
  const { 
    isAvailable, 
    isChecking, 
    getStatusMessage, 
    getStatusIndicator, 
    checkApiStatus 
  } = useApiStatus();

  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant={isAvailable ? "default" : "secondary"}
        className="flex items-center gap-1"
      >
        <span className="text-sm">{getStatusIndicator()}</span>
        <span className="text-xs">{getStatusMessage()}</span>
      </Badge>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={checkApiStatus}
        disabled={isChecking}
        className="h-6 px-2"
      >
        <RefreshCw className={`h-3 w-3 ${isChecking ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
}

// Componente más compacto para usar en headers
export function ApiStatusDot() {
  const { isAvailable, isChecking, getStatusIndicator } = useApiStatus();

  return (
    <div 
      className="flex items-center gap-1 cursor-help"
      title={isAvailable ? "API disponible" : "API no disponible - usando datos locales"}
    >
      <span className="text-xs">{getStatusIndicator()}</span>
      {isChecking && <span className="text-xs text-muted-foreground">...</span>}
    </div>
  );
}


