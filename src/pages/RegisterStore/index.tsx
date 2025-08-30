import { useState } from "react";
import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/select";
import { Textarea } from "@/components/common/ui/textarea";
import { ArrowRight, Store, Mail, Phone, MapPin, Building } from "lucide-react";
import type { StoreRegistrationData } from "@/types/subscription";
import { SubscriptionSelection } from "@/components/store/SubscriptionSelection";
import { RegistrationSuccess } from "@/components/store/RegistrationSuccess";

interface StoreFormData extends StoreRegistrationData {}

export default function RegisterStore() {
  const [formData, setFormData] = useState<StoreFormData>({
    storeName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    businessType: "",
    description: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const handleInputChange = (field: keyof StoreFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar que todos los campos estén llenos
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== "");
    
    if (allFieldsFilled) {
      setCurrentStep(2);
    } else {
      alert("Por favor, completa todos los campos antes de continuar.");
    }
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registra tu Tienda</h1>
          <p className="text-gray-600 text-lg">
            Únete a Busca Listo y conecta con miles de clientes potenciales
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${
              currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'
            }`}>
              2
            </div>
            <div className={`w-16 h-1 ${
              currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= 3 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'
            }`}>
              3
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Información de la Tienda</CardTitle>
              <CardDescription>
                Completa los datos básicos de tu negocio para comenzar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre de la Tienda */}
                  <div className="space-y-2">
                    <Label htmlFor="storeName" className="text-sm font-medium">
                      Nombre de la Tienda *
                    </Label>
                    <Input
                      id="storeName"
                      placeholder="Ej: Mi Tienda Online"
                      value={formData.storeName}
                      onChange={(e) => handleInputChange("storeName", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Nombre del Propietario */}
                  <div className="space-y-2">
                    <Label htmlFor="ownerName" className="text-sm font-medium">
                      Nombre del Propietario *
                    </Label>
                    <Input
                      id="ownerName"
                      placeholder="Tu nombre completo"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange("ownerName", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email de Contacto *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Teléfono *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Dirección */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Dirección *
                    </Label>
                    <Input
                      id="address"
                      placeholder="Calle y número"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Ciudad */}
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">
                      Ciudad *
                    </Label>
                    <Input
                      id="city"
                      placeholder="Tu ciudad"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* País */}
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium">
                      País *
                    </Label>
                    <Input
                      id="country"
                      placeholder="Tu país"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Tipo de Negocio */}
                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-sm font-medium">
                      Tipo de Negocio *
                    </Label>
                    <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Tienda Minorista</SelectItem>
                        <SelectItem value="wholesale">Mayorista</SelectItem>
                        <SelectItem value="service">Servicios</SelectItem>
                        <SelectItem value="food">Restaurante/Comida</SelectItem>
                        <SelectItem value="health">Salud/Belleza</SelectItem>
                        <SelectItem value="technology">Tecnología</SelectItem>
                        <SelectItem value="fashion">Moda/Accesorios</SelectItem>
                        <SelectItem value="home">Hogar/Decoración</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Descripción de la Tienda *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe brevemente tu negocio, qué productos o servicios ofreces..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    className="w-full"
                  />
                </div>

                {/* Botón de Continuar */}
                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuar a Planes
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <SubscriptionSelection 
            storeData={formData} 
            onBack={() => setCurrentStep(1)}
            onSuccess={(planId) => {
              setSelectedPlan(planId);
              setCurrentStep(3);
            }}
          />
        )}

        {currentStep === 3 && (
          <RegistrationSuccess 
            storeName={formData.storeName}
            ownerName={formData.ownerName}
            selectedPlan={selectedPlan}
          />
        )}
      </div>
    </div>
  );
}
