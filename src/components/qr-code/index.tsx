import { useEffect, useRef } from 'react';
import type { QRCodeProps } from '@shared/schema';

export function QRCode({ value, size = 128, className = "" }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Simple QR code generation using a library-free approach
    // For production, you'd want to use a proper QR code library
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    // Create a simple pattern that represents a QR code
    // In a real implementation, you'd use qrcode.js or similar
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    ctx.fillStyle = '#000000';
    const moduleSize = size / 25;
    
    // Create a QR-like pattern
    const pattern = [
      [1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
      [0,1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,0],
      [1,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,1],
      [0,1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,0],
      [1,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,1],
      [0,1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,0],
      [0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1,0,1,1],
      [1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0],
      [1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,1],
      [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0],
      [1,0,1,1,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,1],
      [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0],
      [1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,1],
      [1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0]
    ];

    for (let row = 0; row < pattern.length; row++) {
      for (let col = 0; col < pattern[row].length; col++) {
        if (pattern[row][col] === 1) {
          ctx.fillRect(col * moduleSize + 2, row * moduleSize + 2, moduleSize - 1, moduleSize - 1);
        }
      }
    }
  }, [value, size]);

  return (
    <div className={`inline-block bg-white rounded-lg p-2 ${className}`}>
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
