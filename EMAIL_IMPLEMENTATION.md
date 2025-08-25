# Implementación del Sistema de Emails

## Descripción
Este documento explica cómo implementar el envío real de emails para el sistema de registro de tiendas en Busca Listo.

## Servicios de Email Recomendados

### 1. SendGrid (Recomendado)
- **Ventajas**: Fácil de usar, buena entrega, plantillas HTML
- **Precio**: Gratis hasta 100 emails/día, luego $14.95/mes
- **Documentación**: [SendGrid API](https://sendgrid.com/docs/api-reference/)

### 2. Mailgun
- **Ventajas**: Bueno para desarrolladores, API robusta
- **Precio**: Gratis hasta 5,000 emails/mes
- **Documentación**: [Mailgun API](https://documentation.mailgun.com/)

### 3. AWS SES
- **Ventajas**: Muy económico, integración con AWS
- **Precio**: $0.10 por 1,000 emails
- **Documentación**: [AWS SES](https://docs.aws.amazon.com/ses/)

## Implementación con SendGrid

### 1. Instalar dependencias
```bash
npm install @sendgrid/mail
```

### 2. Configurar variables de entorno
Crear archivo `.env`:
```env
VITE_SENDGRID_API_KEY=tu_api_key_aqui
VITE_FROM_EMAIL=noreply@buscalisto.com
```

### 3. Actualizar el servicio de email
Reemplazar la función `sendEmail` en `src/services/emailService.ts`:

```typescript
import sgMail from '@sendgrid/mail';

// En el constructor
constructor() {
  sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY || '');
}

// Reemplazar la función sendEmail
private async sendEmail(emailData: EmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const msg = {
      to: emailData.to,
      from: import.meta.env.VITE_FROM_EMAIL || 'noreply@buscalisto.com',
      subject: emailData.subject,
      html: emailData.body,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    };
  }
}
```

## Implementación con Mailgun

### 1. Instalar dependencias
```bash
npm install mailgun.js form-data
```

### 2. Configurar variables de entorno
```env
VITE_MAILGUN_API_KEY=tu_api_key_aqui
VITE_MAILGUN_DOMAIN=tu_dominio.mailgun.org
```

### 3. Actualizar el servicio
```typescript
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: import.meta.env.VITE_MAILGUN_API_KEY || '',
});

private async sendEmail(emailData: EmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const msg = {
      from: `Busca Listo <noreply@${import.meta.env.VITE_MAILGUN_DOMAIN}>`,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.body,
    };

          await mg.messages.create(import.meta.env.VITE_MAILGUN_DOMAIN || '', msg);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    };
  }
}
```

## Implementación con AWS SES

### 1. Instalar dependencias
```bash
npm install @aws-sdk/client-ses
```

### 2. Configurar variables de entorno
```env
VITE_AWS_ACCESS_KEY_ID=tu_access_key
VITE_AWS_SECRET_ACCESS_KEY=tu_secret_key
VITE_AWS_REGION=us-east-1
VITE_FROM_EMAIL=noreply@buscalisto.com
```

### 3. Actualizar el servicio
```typescript
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
  },
});

private async sendEmail(emailData: EmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const command = new SendEmailCommand({
      Source: import.meta.env.VITE_FROM_EMAIL || 'noreply@buscalisto.com',
      Destination: {
        ToAddresses: [emailData.to],
      },
      Message: {
        Subject: {
          Data: emailData.subject,
        },
        Body: {
          Html: {
            Data: emailData.body,
          },
        },
      },
    });

    await sesClient.send(command);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    };
  }
}
```

## Configuración del Dominio

### 1. Verificar dominio en el servicio de email
- **SendGrid**: Verificar dominio en Settings > Sender Authentication
- **Mailgun**: Verificar dominio en Sending > Domains
- **AWS SES**: Verificar dominio en Verified Identities

### 2. Configurar DNS
Agregar registros TXT y MX según las instrucciones del proveedor.

### 3. Configurar SPF y DKIM
Para mejorar la entrega de emails, configurar registros SPF y DKIM.

## Plantillas de Email

El sistema ya incluye plantillas HTML bien formateadas para:
- Confirmación de registro al propietario de la tienda
- Notificación al equipo de Busca Listo

## Monitoreo y Logs

### 1. Logs de envío
Todos los emails se registran en la consola del navegador.

### 2. Dashboard del proveedor
Usar el dashboard del proveedor de email para monitorear:
- Tasa de entrega
- Emails rebotados
- Spam reports
- Estadísticas de apertura

## Próximos Pasos

1. **Elegir proveedor de email** según presupuesto y necesidades
2. **Configurar variables de entorno** con las credenciales
3. **Verificar dominio** en el proveedor elegido
4. **Probar envío** con emails de prueba
5. **Monitorear métricas** de entrega

## Soporte

Para dudas sobre la implementación, contactar al equipo de desarrollo o consultar la documentación del proveedor elegido.
