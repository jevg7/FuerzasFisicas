import { Charge, TargetCharge } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowRight, Zap } from 'lucide-react';

interface ForceCalculationProps {
  charges: Charge[];
  targetCharge: TargetCharge;
}

// Constante de Coulomb en N⋅m²/C²
const K = 8.99e9;

interface ForceVector {
  fx: number; // Componente en X
  fy: number; // Componente en Y
  magnitude: number; // Magnitud de la fuerza
  source: Charge; // Carga que causa esta fuerza
}

export function ForceCalculation({ charges, targetCharge }: ForceCalculationProps) {
  // Calcular la fuerza ejercida por cada carga sobre la carga objetivo
  const calculateForces = (): ForceVector[] => {
    return charges.map((charge) => {
      // Vector de desplazamiento desde la carga fuente hasta la carga objetivo
      const dx = targetCharge.position.x - charge.position.x;
      const dy = targetCharge.position.y - charge.position.y;

      // Distancia entre las cargas
      const r = Math.sqrt(dx * dx + dy * dy);

      if (r === 0) {
        // Si las cargas están en la misma posición, no hay fuerza
        return {
          fx: 0,
          fy: 0,
          magnitude: 0,
          source: charge,
        };
      }

      // Magnitud de la fuerza según Ley de Coulomb: F = k * |q1 * q2| / r²
      const forceMagnitude = (K * Math.abs(charge.magnitude * targetCharge.magnitude)) / (r * r);

      // Vector unitario de dirección
      const ux = dx / r;
      const uy = dy / r;

      // Determinar la dirección de la fuerza
      // Si las cargas tienen el mismo signo, se repelen (fuerza hacia afuera)
      // Si tienen signos opuestos, se atraen (fuerza hacia adentro)
      const sameSign = (charge.magnitude * targetCharge.magnitude) > 0;
      const direction = sameSign ? 1 : -1;

      // Componentes de la fuerza
      const fx = direction * forceMagnitude * ux;
      const fy = direction * forceMagnitude * uy;

      return {
        fx,
        fy,
        magnitude: forceMagnitude,
        source: charge,
      };
    });
  };

  const forces = calculateForces();

  // Calcular la fuerza neta (suma vectorial)
  const netForce = forces.reduce(
    (acc, force) => ({
      fx: acc.fx + force.fx,
      fy: acc.fy + force.fy,
    }),
    { fx: 0, fy: 0 }
  );

  // Magnitud de la fuerza neta
  const netForceMagnitude = Math.sqrt(netForce.fx * netForce.fx + netForce.fy * netForce.fy);

  // Ángulo de la fuerza neta (en grados)
  const angle = Math.atan2(netForce.fy, netForce.fx) * (180 / Math.PI);

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-600" />
          Resultados del Cálculo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Individual Forces */}
        <div>
          <h4 className="font-medium text-sm text-gray-700 mb-2">
            Fuerzas Individuales:
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {forces.map((force, index) => (
              <div
                key={force.source.id}
                className="bg-white p-3 rounded-md border text-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">F{index + 1}:</span>
                  <span className="text-gray-600">
                    |F| = {force.magnitude.toExponential(3)} N
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  F{index + 1} = ⟨{force.fx.toExponential(3)}, {force.fy.toExponential(3)}⟩ N
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Net Force */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border-2 border-purple-300">
          <h4 className="font-bold text-lg text-purple-900 mb-3 flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Fuerza Neta (Principio de Superposición):
          </h4>
          
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Vector de Fuerza Neta:</p>
              <p className="font-mono text-lg font-bold text-purple-900">
                F<sub>neta</sub> = ⟨{netForce.fx.toExponential(4)}, {netForce.fy.toExponential(4)}⟩ N
              </p>
            </div>

            <div className="bg-white p-3 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Magnitud de la Fuerza Neta:</p>
              <p className="font-mono text-lg font-bold text-purple-900">
                |F<sub>neta</sub>| = {netForceMagnitude.toExponential(4)} N
              </p>
            </div>

            <div className="bg-white p-3 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Ángulo (respecto al eje X):</p>
              <p className="font-mono text-lg font-bold text-purple-900">
                θ = {angle.toFixed(2)}°
              </p>
            </div>
          </div>
        </div>

        {/* Formula Reference */}
        <div className="text-xs text-gray-600 bg-white p-3 rounded-md border">
          <p className="font-medium mb-1">Fórmula utilizada:</p>
          <p className="font-mono">F = k · |q₁ · q₂| / r²</p>
          <p className="mt-1">donde k = 8.99 × 10⁹ N·m²/C²</p>
        </div>
      </CardContent>
    </Card>
  );
}
