import { Button } from "@/components/common/ui/button";
import { AlertTriangle } from "lucide-react";
import type { ErrorStateProps } from "@shared/schema";

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <AlertTriangle className="h-16 w-16 text-red-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          Error al cargar productos
        </h3>
        <p className="text-slate-600 mb-6">{error}</p>
        <div className="space-x-3">
          <Button
            onClick={onRetry}
            className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </Button>
          <Button
            variant="ghost"
            className="text-slate-600 px-4 py-2 hover:bg-slate-100 transition-colors"
          >
            Contactar soporte
          </Button>
        </div>
      </div>
    </div>
  );
}
