import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Target, AlertCircle } from 'lucide-react';
import { TargetCharge } from '../App';

interface TargetChargeInputProps {
  onSetTarget: (target: TargetCharge) => void;
  currentTarget: TargetCharge | null;
}

export function TargetChargeInput({ onSetTarget, currentTarget }: TargetChargeInputProps) {
  const [magnitude, setMagnitude] = useState(currentTarget?.magnitude.toString() || '');
  const [posX, setPosX] = useState(currentTarget?.position.x.toString() || '');
  const [posY, setPosY] = useState(currentTarget?.position.y.toString() || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const mag = parseFloat(magnitude);
    const x = parseFloat(posX);
    const y = parseFloat(posY);

    if (isNaN(mag) || isNaN(x) || isNaN(y)) {
      setError('Por favor ingrese valores numéricos válidos');
      return;
    }

    if (mag === 0) {
      setError('La magnitud no puede ser cero');
      return;
    }

    onSetTarget({ magnitude: mag * 1e-6, position: { x, y } });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carga Objetivo</CardTitle>
        <CardDescription>
          Defina la carga sobre la cual se calculará la fuerza neta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="target-magnitude">Magnitud de la Carga (μC)</Label>
            <Input
              id="target-magnitude"
              type="text"
              placeholder="ej: 1 o -1"
              value={magnitude}
              onChange={(e) => setMagnitude(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Use notación científica. Positivo (+) o negativo (-)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="target-posX">Posición X (m)</Label>
              <Input
                id="target-posX"
                type="text"
                placeholder="ej: 0"
                value={posX}
                onChange={(e) => setPosX(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="target-posY">Posición Y (m)</Label>
              <Input
                id="target-posY"
                type="text"
                placeholder="ej: 0"
                value={posY}
                onChange={(e) => setPosY(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" className="w-full">
            <Target className="w-4 h-4 mr-2" />
            {currentTarget ? 'Actualizar Carga Objetivo' : 'Establecer Carga Objetivo'}
          </Button>
        </form>

        {currentTarget && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <h4 className="font-medium text-sm text-green-800 mb-2">Carga Objetivo Actual:</h4>
            <div className="text-sm">
              <p>
                <span className="font-medium">Magnitud:</span>{' '}
                <span className={currentTarget.magnitude > 0 ? 'text-red-600' : 'text-blue-600'}>
                  {(currentTarget.magnitude * 1e6).toExponential(2)} μC
                </span>
              </p>
              <p>
                <span className="font-medium">Posición:</span>{' '}
                <span className="text-gray-700">
                  ({currentTarget.position.x.toFixed(2)}, {currentTarget.position.y.toFixed(2)}) m
                </span>
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
