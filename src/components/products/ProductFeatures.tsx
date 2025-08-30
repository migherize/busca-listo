import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Star, Info } from "lucide-react";

interface ProductFeaturesProps {
  characteristics?: string | null;
  advancedCharacteristics?: string | null;
  highlightedFeatures?: string | null;
  pros?: string | null;
  cons?: string | null;
  accessories?: string | null;
}

export function ProductFeatures({
  characteristics,
  advancedCharacteristics,
  highlightedFeatures,
  pros,
  cons,
  accessories,
}: ProductFeaturesProps) {
  const hasFeatures = characteristics || advancedCharacteristics || highlightedFeatures || pros || cons || accessories;

  if (!hasFeatures) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Características Principales */}
      {characteristics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-blue-600" />
              Características Principales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-relaxed">{characteristics}</p>
          </CardContent>
        </Card>
      )}

      {/* Características Destacadas */}
      {highlightedFeatures && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5 text-yellow-500" />
              Características Destacadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-relaxed">{highlightedFeatures}</p>
          </CardContent>
        </Card>
      )}

      {/* Pros y Contras */}
      {(pros || cons) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pros */}
          {pros && (
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-green-700">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Ventajas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 leading-relaxed">{pros}</p>
              </CardContent>
            </Card>
          )}

          {/* Contras */}
          {cons && (
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-red-700">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Consideraciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 leading-relaxed">{cons}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Accesorios */}
      {accessories && (
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
            <p className="text-slate-700 leading-relaxed">{accessories}</p>
          </CardContent>
        </Card>
      )}

      {/* Características Avanzadas */}
      {advancedCharacteristics && (
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
            <p className="text-slate-700 leading-relaxed">{advancedCharacteristics}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


