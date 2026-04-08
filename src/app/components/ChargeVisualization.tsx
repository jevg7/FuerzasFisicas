import { useEffect, useRef } from 'react';
import { Charge, TargetCharge } from '../App';

interface ChargeVisualizationProps {
  charges: Charge[];
  targetCharge: TargetCharge | null;
}

const K = 8.99e9; // Constante de Coulomb

export function ChargeVisualization({ charges, targetCharge }: ChargeVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Scale factor (pixels per meter)
    // Find the range of positions to determine scale
    let maxDistance = 1; // minimum scale
    
    const allPositions = [
      ...charges.map(c => c.position),
      ...(targetCharge ? [targetCharge.position] : []),
    ];

    if (allPositions.length > 0) {
      allPositions.forEach(pos => {
        const dist = Math.max(Math.abs(pos.x), Math.abs(pos.y));
        maxDistance = Math.max(maxDistance, dist);
      });
    }

    const scale = Math.min(width, height) / (2.5 * maxDistance);

    // Convert world coordinates to canvas coordinates
    const toCanvas = (x: number, y: number) => ({
      x: centerX + x * scale,
      y: centerY - y * scale, // Invert Y axis
    });

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    // Vertical and horizontal axes
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.strokeStyle = '#999';
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText('X', width - 20, centerY - 10);
    ctx.fillText('Y', centerX + 10, 20);
    ctx.fillText('0', centerX + 5, centerY - 5);

    // Calculate and draw force vectors if target charge exists
    if (targetCharge && charges.length > 0) {
      const targetPos = toCanvas(targetCharge.position.x, targetCharge.position.y);

      charges.forEach((charge) => {
        const dx = targetCharge.position.x - charge.position.x;
        const dy = targetCharge.position.y - charge.position.y;
        const r = Math.sqrt(dx * dx + dy * dy);

        if (r === 0) return;

        const forceMagnitude = (K * Math.abs(charge.magnitude * targetCharge.magnitude)) / (r * r);
        const ux = dx / r;
        const uy = dy / r;

        const sameSign = (charge.magnitude * targetCharge.magnitude) > 0;
        const direction = sameSign ? 1 : -1;

        const fx = direction * forceMagnitude * ux;
        const fy = direction * forceMagnitude * uy;

        // Normalize force vector for display (scale for visibility)
        const forceScale = 50; // Adjust this for vector length
        const vectorLength = Math.sqrt(fx * fx + fy * fy);
        const normalizedFx = (fx / vectorLength) * forceScale;
        const normalizedFy = (fy / vectorLength) * forceScale;

        // Draw force vector as arrow
        const endX = targetPos.x + normalizedFx;
        const endY = targetPos.y - normalizedFy; // Invert Y

        ctx.strokeStyle = sameSign ? '#ef4444' : '#3b82f6'; // Red for repulsion, blue for attraction
        ctx.fillStyle = sameSign ? '#ef4444' : '#3b82f6';
        ctx.lineWidth = 2;

        // Draw line
        ctx.beginPath();
        ctx.moveTo(targetPos.x, targetPos.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Draw arrowhead
        const angle = Math.atan2(-(normalizedFy), normalizedFx);
        const arrowSize = 8;
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(
          endX - arrowSize * Math.cos(angle - Math.PI / 6),
          endY + arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          endX - arrowSize * Math.cos(angle + Math.PI / 6),
          endY + arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
      });

      // Calculate and draw net force vector
      const netForce = charges.reduce(
        (acc, charge) => {
          const dx = targetCharge.position.x - charge.position.x;
          const dy = targetCharge.position.y - charge.position.y;
          const r = Math.sqrt(dx * dx + dy * dy);

          if (r === 0) return acc;

          const forceMagnitude = (K * Math.abs(charge.magnitude * targetCharge.magnitude)) / (r * r);
          const ux = dx / r;
          const uy = dy / r;
          const sameSign = (charge.magnitude * targetCharge.magnitude) > 0;
          const direction = sameSign ? 1 : -1;

          return {
            fx: acc.fx + direction * forceMagnitude * ux,
            fy: acc.fy + direction * forceMagnitude * uy,
          };
        },
        { fx: 0, fy: 0 }
      );

      // Draw net force vector (thicker, different color)
      const netVectorLength = Math.sqrt(netForce.fx * netForce.fx + netForce.fy * netForce.fy);
      if (netVectorLength > 0) {
        const forceScale = 70;
        const normalizedNetFx = (netForce.fx / netVectorLength) * forceScale;
        const normalizedNetFy = (netForce.fy / netVectorLength) * forceScale;

        const netEndX = targetPos.x + normalizedNetFx;
        const netEndY = targetPos.y - normalizedNetFy;

        ctx.strokeStyle = '#7c3aed'; // Purple for net force
        ctx.fillStyle = '#7c3aed';
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(targetPos.x, targetPos.y);
        ctx.lineTo(netEndX, netEndY);
        ctx.stroke();

        const angle = Math.atan2(-(normalizedNetFy), normalizedNetFx);
        const arrowSize = 12;
        ctx.beginPath();
        ctx.moveTo(netEndX, netEndY);
        ctx.lineTo(
          netEndX - arrowSize * Math.cos(angle - Math.PI / 6),
          netEndY + arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          netEndX - arrowSize * Math.cos(angle + Math.PI / 6),
          netEndY + arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
      }
    }

    // Draw charges
    charges.forEach((charge, index) => {
      const pos = toCanvas(charge.position.x, charge.position.y);
      const radius = 12;

      // Draw circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = charge.magnitude > 0 ? '#fee2e2' : '#dbeafe';
      ctx.fill();
      ctx.strokeStyle = charge.magnitude > 0 ? '#ef4444' : '#3b82f6';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw sign
      ctx.fillStyle = charge.magnitude > 0 ? '#ef4444' : '#3b82f6';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(charge.magnitude > 0 ? '+' : '−', pos.x, pos.y);

      // Draw label
      ctx.fillStyle = '#000';
      ctx.font = '11px Arial';
      ctx.fillText(`q${index + 1}`, pos.x, pos.y + radius + 12);
    });

    // Draw target charge
    if (targetCharge) {
      const pos = toCanvas(targetCharge.position.x, targetCharge.position.y);
      const radius = 15;

      // Draw outer ring
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 3, 0, 2 * Math.PI);
      ctx.strokeStyle = '#7c3aed';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = targetCharge.magnitude > 0 ? '#fef3c7' : '#e0e7ff';
      ctx.fill();
      ctx.strokeStyle = targetCharge.magnitude > 0 ? '#f59e0b' : '#6366f1';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw sign
      ctx.fillStyle = targetCharge.magnitude > 0 ? '#f59e0b' : '#6366f1';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(targetCharge.magnitude > 0 ? '+' : '−', pos.x, pos.y);

      // Draw label
      ctx.fillStyle = '#7c3aed';
      ctx.font = 'bold 12px Arial';
      ctx.fillText('Q', pos.x, pos.y - radius - 12);
    }

  }, [charges, targetCharge]);

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={500}
        className="border border-gray-300 rounded-lg bg-white w-full"
      />
      
      {/* Legend */}
      <div className="bg-gray-50 p-4 rounded-lg border text-sm space-y-2">
        <h4 className="font-medium text-gray-700 mb-2">Leyenda:</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-purple-600 bg-purple-100 flex items-center justify-center">
              <span className="text-xs font-bold text-purple-600">Q</span>
            </div>
            <span>Carga Objetivo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-red-500 bg-red-100 flex items-center justify-center">
              <span className="text-xs font-bold text-red-500">+</span>
            </div>
            <span>Carga Positiva</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-blue-500 bg-blue-100 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-500">−</span>
            </div>
            <span>Carga Negativa</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-purple-600"></div>
            <span>Fuerza Neta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-red-500"></div>
            <span>Repulsión</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-blue-500"></div>
            <span>Atracción</span>
          </div>
        </div>
      </div>
    </div>
  );
}
