import { Button } from '@/components/common/ui/button';
import { Download } from 'lucide-react';
import type { PDFDownloadProps } from '@shared/schema';

export function PDFDownload({ targetId, filename = "busca-listo-flyer.pdf", children }: PDFDownloadProps) {
  const handleDownload = async () => {
    try {
      // For a real implementation, you'd use html2canvas and jsPDF
      // This is a simplified version that uses the browser's print functionality
      const element = document.getElementById(targetId);
      if (!element) {
        console.error('Target element not found');
        return;
      }

      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        console.error('Could not open print window');
        return;
      }

      // Clone the element and its styles
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      // Create the print document
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${filename}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: 'Inter', sans-serif; 
                line-height: 1.6; 
                color: #1f2937; 
                background: white;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .no-print { display: none !important; }
              .bg-gradient-to-br { 
                background: linear-gradient(135deg, #2563EB 0%, #0891B2 100%) !important; 
                color: white !important;
              }
              .bg-gradient-to-r {
                background: linear-gradient(90deg, #f9fafb 0%, #dbeafe 100%) !important;
              }
              .shadow-lg, .shadow-xl, .shadow-2xl { box-shadow: none !important; }
              .rounded-xl, .rounded-2xl { border-radius: 12px !important; }
              .text-medical-blue { color: #2563EB !important; }
              .text-healthcare-green { color: #059669 !important; }
              .text-trust-teal { color: #0891B2 !important; }
              .text-medical-gray { color: #64748B !important; }
              .bg-medical-blue { background-color: #2563EB !important; }
              .bg-healthcare-green { background-color: #059669 !important; }
              .bg-trust-teal { background-color: #0891B2 !important; }
              @page { 
                margin: 1cm; 
                size: A4;
              }
            </style>
          </head>
          <body>
            ${clonedElement.outerHTML}
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Wait for content to load then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Button 
      onClick={handleDownload}
      data-testid="button-download-pdf"
      className="bg-medical-blue hover:bg-blue-700 text-white"
    >
      <Download className="w-4 h-4 mr-2" />
      {children || 'Descargar PDF'}
    </Button>
  );
}
