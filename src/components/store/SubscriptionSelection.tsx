import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft, Star, Zap, Crown } from "lucide-react";
import subscriptionsData from "@/data/subscriptions.json";
import emailService from "@/services/emailService";
import type { StoreRegistrationData, SubscriptionPlan } from "@/types/subscription";

interface SubscriptionSelectionProps {
  storeData: StoreRegistrationData;
  onBack: () => void;
  onSuccess: (planId: string) => void;
}

export function SubscriptionSelection({ storeData, onBack, onSuccess }: SubscriptionSelectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubmit = async () => {
    if (!selectedPlan) {
      alert("Por favor selecciona un plan antes de continuar.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const plan = subscriptionsData.subscriptions.find(sub => sub.id === selectedPlan);
      if (!plan) {
        throw new Error("Plan no encontrado");
      }

      // Enviar email de confirmación al propietario de la tienda
      const emailSent = await emailService.sendStoreRegistrationConfirmation(storeData, plan as any);
      
      if (emailSent) {
        // Enviar notificación al equipo (opcional)
        await emailService.sendTeamNotification(storeData, plan as any);
        
        // Llamar a la función de éxito en lugar de redirigir
        onSuccess(selectedPlan);
      } else {
        throw new Error("Error al enviar email de confirmación");
      }
      
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un error al procesar tu registro. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };



  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "basic":
        return <Zap className="w-6 h-6" />;
      case "medium":
        return <Star className="w-6 h-6" />;
      case "premium":
        return <Crown className="w-6 h-6" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  const getFeatureText = (feature: any, key: string) => {
    switch (key) {
      case "products":
        return `${feature} productos`;
      case "ads":
        return feature ? "Sí" : "No";
      case "listingPriority":
        switch (feature) {
          case "none": return "No";
          case "medium": return "Media";
          case "high": return "Alta";
          default: return "No";
        }
      case "locations":
        switch (feature) {
          case "limited": return "Limitadas";
          case "sidebar_internal": return "Sidebar / Secciones internas";
          case "home_sidebar_exclusive": return "Home + Sidebar + Exclusivas";
          default: return "Limitadas";
        }
      case "statistics":
        return feature ? "Sí" : "No";
      case "support":
        switch (feature) {
          case "basic": return "Básico (FAQ/Email)";
          case "standard": return "Estándar (48h)";
          case "priority": return "Prioritario (24h)";
          default: return "Básico";
        }
      case "extras":
        if (feature.length === 0) return "No";
        return feature.map((extra: string) => {
          switch (extra) {
            case "personalized_links": return "Links personalizados";
            case "exclusive_locations": return "Ubicaciones exclusivas";
            case "special_campaigns": return "Campañas especiales";
            default: return extra;
          }
        }).join(", ");
      default:
        return feature;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header del paso 2 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Elige tu Plan de Suscripción</h2>
        <p className="text-gray-600">
          Selecciona el plan que mejor se adapte a las necesidades de tu tienda
        </p>
      </div>

      {/* Planes de Suscripción */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionsData.subscriptions.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedPlan === plan.id 
                ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
                : 'hover:scale-105'
            }`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Más Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">
                <div className={`p-3 rounded-full ${
                  plan.id === "basic" ? "bg-blue-100 text-blue-600" :
                  plan.id === "medium" ? "bg-purple-100 text-purple-600" :
                  "bg-yellow-100 text-yellow-600"
                }`}>
                  {getPlanIcon(plan.id)}
                </div>
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription className="text-sm">{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Precio */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                  <span className="text-sm font-normal text-gray-500">/mes</span>
                </div>
                {plan.price === 0 && (
                  <p className="text-sm text-green-600 font-medium">¡Gratis para siempre!</p>
                )}
              </div>

              {/* Características */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Productos</span>
                  <span className="text-sm font-medium">{getFeatureText(plan.features.products, "products")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Anuncios</span>
                  <span className="text-sm font-medium">{getFeatureText(plan.features.ads, "ads")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Prioridad</span>
                  <span className="text-sm font-medium">{getFeatureText(plan.features.listingPriority, "listingPriority")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ubicaciones</span>
                  <span className="text-sm font-medium">{getFeatureText(plan.features.locations, "locations")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estadísticas</span>
                  <span className="text-sm font-medium">{getFeatureText(plan.features.statistics, "statistics")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Soporte</span>
                  <span className="text-sm font-medium">{getFeatureText(plan.features.support, "support")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Extras</span>
                  <span className="text-sm font-medium">{getFeatureText(plan.features.extras, "extras")}</span>
                </div>
              </div>

              {/* Botón de Selección */}
              <Button
                className={`w-full ${
                  selectedPlan === plan.id 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
                variant={selectedPlan === plan.id ? "default" : "outline"}
              >
                {selectedPlan === plan.id ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Seleccionado
                  </>
                ) : (
                  "Seleccionar Plan"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botones de Navegación */}
      <div className="flex justify-between items-center pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={!selectedPlan || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Procesando..." : "Completar Registro"}
        </Button>
      </div>
    </div>
  );
}
