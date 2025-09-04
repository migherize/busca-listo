import { Badge } from "@/components/common/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card";
import { CheckCircle, XCircle, Star, Info } from "lucide-react";

interface ProductFeaturesProps {
  characteristics?: string | null;
  advancedCharacteristics?: string | null;
  highlightedFeatures?: string | null;
  pros?: string | null;
  cons?: string | null;
  accessories?: string | null;
}

// Función helper para parsear JSON y mostrar como viñetas
function parseJsonToBullets(jsonString: string | null): JSX.Element | null {
  if (!jsonString || jsonString.trim() === '') return null;
  
  try {
    // Intentar parsear como JSON
    const parsed = JSON.parse(jsonString);
    
    // Si es un array de objetos
    if (Array.isArray(parsed)) {
      // Verificar si el array está vacío
      if (parsed.length === 0) return null;
      
      // Verificar si todos los objetos están vacíos
      const hasValidContent = parsed.some(item => 
        typeof item === 'object' && item !== null && Object.keys(item).length > 0
      );
      
      if (!hasValidContent) return null;
      
      return (
        <ul className="space-y-2">
          {parsed.map((item, index) => {
            if (typeof item !== 'object' || item === null || Object.keys(item).length === 0) {
              return null;
            }
            
            return (
              <li key={index} className="flex items-start gap-2">
                <span className="text-slate-500 mt-1">•</span>
                <div className="flex-1">
                  {Object.entries(item).map(([key, value]) => {
                    if (!value || String(value).trim() === '') return null;
                    
                    return (
                      <div key={key} className="mb-1">
                        <span className="font-medium text-slate-700 capitalize">
                          {key.replace(/_/g, ' ')}:
                        </span>
                        <span className="text-slate-600 ml-1">
                          {String(value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
    
    // Si es un objeto simple
    if (typeof parsed === 'object' && parsed !== null) {
      // Verificar si el objeto está vacío
      if (Object.keys(parsed).length === 0) return null;
      
      // Verificar si todos los valores están vacíos
      const hasValidContent = Object.values(parsed).some(value => 
        value !== null && value !== undefined && String(value).trim() !== ''
      );
      
      if (!hasValidContent) return null;
      
      return (
        <ul className="space-y-2">
          {Object.entries(parsed).map(([key, value]) => {
            if (!value || String(value).trim() === '') return null;
            
            return (
              <li key={key} className="flex items-start gap-2">
                <span className="text-slate-500 mt-1">•</span>
                <div className="flex-1">
                  <span className="font-medium text-slate-700 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </span>
                  <span className="text-slate-600 ml-1">
                    {String(value)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
    
    // Si no es un objeto, verificar si tiene contenido
    const stringValue = String(parsed).trim();
    if (stringValue === '' || stringValue === 'null' || stringValue === 'undefined') {
      return null;
    }
    
    return <p className="text-slate-700 leading-relaxed">{stringValue}</p>;
    
  } catch (error) {
    // Si no se puede parsear como JSON, verificar si tiene contenido
    const trimmedString = jsonString.trim();
    if (trimmedString === '' || trimmedString === 'null' || trimmedString === 'undefined') {
      return null;
    }
    
    return <p className="text-slate-700 leading-relaxed">{trimmedString}</p>;
  }
}

export function ProductFeatures({
  characteristics,
  advancedCharacteristics,
  highlightedFeatures,
  pros,
  cons,
  accessories,
}: ProductFeaturesProps) {
  const hasFeatures = 
    (characteristics && parseJsonToBullets(characteristics)) ||
    (advancedCharacteristics && parseJsonToBullets(advancedCharacteristics)) ||
    (highlightedFeatures && parseJsonToBullets(highlightedFeatures)) ||
    (pros && parseJsonToBullets(pros)) ||
    (cons && parseJsonToBullets(cons)) ||
    (accessories && parseJsonToBullets(accessories));

  if (!hasFeatures) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Características Principales */}
      {characteristics && parseJsonToBullets(characteristics) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-blue-600" />
              Características Principales
            </CardTitle>
          </CardHeader>
          <CardContent>
            {parseJsonToBullets(characteristics)}
          </CardContent>
        </Card>
      )}

      {/* Características Destacadas */}
      {highlightedFeatures && parseJsonToBullets(highlightedFeatures) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5 text-yellow-500" />
              Características Destacadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {parseJsonToBullets(highlightedFeatures)}
          </CardContent>
        </Card>
      )}

      {/* Pros y Contras */}
      {((pros && parseJsonToBullets(pros)) || (cons && parseJsonToBullets(cons))) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pros */}
          {pros && parseJsonToBullets(pros) && (
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-green-700">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Ventajas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-green-700">
                  {parseJsonToBullets(pros)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contras */}
          {cons && parseJsonToBullets(cons) && (
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-red-700">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Consideraciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-red-700">
                  {parseJsonToBullets(cons)}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Accesorios */}
      {accessories && parseJsonToBullets(accessories) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Badge variant="secondary" className="text-sm">
                📦
              </Badge>
              Accesorios Incluidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {parseJsonToBullets(accessories)}
          </CardContent>
        </Card>
      )}

      {/* Características Avanzadas */}
      {advancedCharacteristics && parseJsonToBullets(advancedCharacteristics) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Badge variant="outline" className="text-sm">
                🔬
              </Badge>
              Características Avanzadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {parseJsonToBullets(advancedCharacteristics)}
          </CardContent>
        </Card>
      )}
    </div>
  );
}


