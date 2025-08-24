import type { StoreRegistrationData, SubscriptionPlan, EmailData } from "@/types/subscription";

export class EmailService {
  private static instance: EmailService;
  private apiUrl: string;

  private constructor() {
    // En producción, esto vendría de variables de entorno
    this.apiUrl = import.meta.env.VITE_EMAIL_API_URL || 'https://api.buscalisto.com/email';
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Envía email de confirmación de registro de tienda
   */
  async sendStoreRegistrationConfirmation(
    storeData: StoreRegistrationData, 
    selectedPlan: SubscriptionPlan
  ): Promise<boolean> {
    try {
      const emailData: EmailData = {
        to: storeData.email,
        subject: `¡Bienvenido a Busca Listo, ${storeData.ownerName}!`,
        body: this.generateRegistrationEmailBody(storeData, selectedPlan)
      };

      // En producción, aquí harías la llamada real a tu API de email
      const response = await this.sendEmail(emailData);
      
      if (response.success) {
        console.log(`Email enviado exitosamente a ${storeData.email}`);
        return true;
      } else {
        console.error('Error al enviar email:', response.error);
        return false;
      }
    } catch (error) {
      console.error('Error en el servicio de email:', error);
      return false;
    }
  }

  /**
   * Envía email de bienvenida al equipo de Busca Listo
   */
  async sendTeamNotification(
    storeData: StoreRegistrationData, 
    selectedPlan: SubscriptionPlan
  ): Promise<boolean> {
    try {
      const emailData: EmailData = {
        to: 'admin@buscalisto.com', // Email del equipo
        subject: `Nueva tienda registrada: ${storeData.storeName}`,
        body: this.generateTeamNotificationBody(storeData, selectedPlan)
      };

      const response = await this.sendEmail(emailData);
      return response.success;
    } catch (error) {
      console.error('Error al enviar notificación al equipo:', error);
      return false;
    }
  }

  /**
   * Genera el cuerpo del email de confirmación para el propietario de la tienda
   */
  private generateRegistrationEmailBody(
    storeData: StoreRegistrationData, 
    selectedPlan: SubscriptionPlan
  ): string {
    const planFeatures = this.getPlanFeatures(selectedPlan.id);
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>¡Bienvenido a Busca Listo!</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">¡Bienvenido a Busca Listo!</h1>
            <p style="color: #666; margin: 10px 0;">Tu tienda ha sido registrada exitosamente</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e40af; margin-top: 0;">Detalles de tu Tienda</h2>
            <p><strong>Nombre:</strong> ${storeData.storeName}</p>
            <p><strong>Propietario:</strong> ${storeData.ownerName}</p>
            <p><strong>Email:</strong> ${storeData.email}</p>
            <p><strong>Teléfono:</strong> ${storeData.phone}</p>
            <p><strong>Ubicación:</strong> ${storeData.address}, ${storeData.city}, ${storeData.country}</p>
            <p><strong>Tipo de Negocio:</strong> ${this.getBusinessTypeLabel(storeData.businessType)}</p>
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e40af; margin-top: 0;">Plan Seleccionado: ${selectedPlan.name}</h2>
            <p style="font-size: 24px; font-weight: bold; color: #059669; margin: 10px 0;">
              $${selectedPlan.price} ${selectedPlan.currency}/mes
            </p>
            <div style="margin: 15px 0;">
              ${planFeatures}
            </div>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #92400e; margin-top: 0;">Próximos Pasos</h3>
            <ol style="margin: 0; padding-left: 20px;">
              <li>Recibirás un email de verificación en las próximas 24 horas</li>
              <li>Nuestro equipo revisará tu solicitud (1-2 días hábiles)</li>
              <li>Una vez aprobada, recibirás acceso a tu panel de administración</li>
              <li>Podrás comenzar a subir productos y configurar tu tienda</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              Si tienes alguna pregunta, no dudes en contactarnos:<br>
              <a href="mailto:soporte@buscalisto.com" style="color: #2563eb;">soporte@buscalisto.com</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px;">
              © ${new Date().getFullYear()} Busca Listo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Genera el cuerpo del email de notificación para el equipo
   */
  private generateTeamNotificationBody(
    storeData: StoreRegistrationData, 
    selectedPlan: SubscriptionPlan
  ): string {
    return `
      Nueva tienda registrada en Busca Listo:
      
      Nombre: ${storeData.storeName}
      Propietario: ${storeData.ownerName}
      Email: ${storeData.email}
      Teléfono: ${storeData.phone}
      Ubicación: ${storeData.address}, ${storeData.city}, ${storeData.country}
      Tipo de Negocio: ${this.getBusinessTypeLabel(storeData.businessType)}
      Plan Seleccionado: ${selectedPlan.name} ($${selectedPlan.price})
      
      Descripción: ${storeData.description}
      
      Fecha de Registro: ${new Date().toLocaleString()}
    `;
  }

  /**
   * Obtiene las características del plan en formato HTML
   */
  private getPlanFeatures(planId: string): string {
    const features = {
      basic: `
        <ul style="margin: 0; padding-left: 20px;">
          <li>✅ 30 productos</li>
          <li>❌ Anuncios</li>
          <li>❌ Prioridad en listado</li>
          <li>❌ Ubicaciones limitadas</li>
          <li>❌ Estadísticas</li>
          <li>📧 Soporte básico (FAQ/Email)</li>
        </ul>
      `,
      medium: `
        <ul style="margin: 0; padding-left: 20px;">
          <li>✅ 100 productos</li>
          <li>✅ Anuncios</li>
          <li>✅ Prioridad media en listado</li>
          <li>✅ Sidebar / Secciones internas</li>
          <li>❌ Estadísticas</li>
          <li>⏰ Soporte estándar (48h)</li>
          <li>🔗 Links personalizados</li>
        </ul>
      `,
      premium: `
        <ul style="margin: 0; padding-left: 20px;">
          <li>✅ 500 productos</li>
          <li>✅ Anuncios</li>
          <li>✅ Prioridad alta en listado</li>
          <li>✅ Home + Sidebar + Exclusivas</li>
          <li>✅ Estadísticas</li>
          <li>🚀 Soporte prioritario (24h)</li>
          <li>⭐ Ubicaciones exclusivas</li>
          <li>🎯 Campañas especiales</li>
        </ul>
      `
    };

    return features[planId as keyof typeof features] || features.basic;
  }

  /**
   * Obtiene la etiqueta legible del tipo de negocio
   */
  private getBusinessTypeLabel(businessType: string): string {
    const labels = {
      retail: "Tienda Minorista",
      wholesale: "Mayorista",
      service: "Servicios",
      food: "Restaurante/Comida",
      health: "Salud/Belleza",
      technology: "Tecnología",
      fashion: "Moda/Accesorios",
      home: "Hogar/Decoración",
      other: "Otro"
    };

    return labels[businessType as keyof typeof labels] || businessType;
  }

  /**
   * Envía el email (simulado por ahora)
   */
  private async sendEmail(emailData: EmailData): Promise<{ success: boolean; error?: string }> {
    try {
      // En producción, aquí harías la llamada real a tu API
      // Por ejemplo:
      // const response = await fetch(`${this.apiUrl}/send`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(emailData)
      // });
      
      // Por ahora simulamos el envío
      console.log('Simulando envío de email:', emailData);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular respuesta exitosa
      return { success: true };
      
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }
}

export default EmailService.getInstance();
