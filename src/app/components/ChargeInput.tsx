import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { Charge } from '../App';

interface ChargeInputProps {
  onAddCharge: (magnitude: number, position: { x: number; y: number }) => void;
  onClearCharges: () => void;
  charges: Charge[];
  onRemoveCharge: (id: string) => void;
}

export function ChargeInput({ onAddCharge, onClearCharges, charges, onRemoveCharge }: ChargeInputProps) {
  const [magnitude, setMagnitude] = useState('');
  const [posX, setPosX] = useState('');
  const [posY, setPosY] = useState('');
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

    onAddCharge(mag * 1e-6, { x, y });
    setMagnitude('');
    setPosX('');
    setPosY('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cargas Puntuales (n = {charges.length})</CardTitle>
        <CardDescription>
          Agregue las cargas fuente que ejercen fuerza sobre la carga objetivo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="magnitude">Magnitud de la Carga (μC)</Label>
            <Input
              id="magnitude"
              type="text"
              placeholder="ej: 2 o -3"
              value={magnitude}
              onChange={(e) => setMagnitude(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Use notación científica. Positivo (+) o negativo (-)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="posX">Posición X (m)</Label>
              <Input
                id="posX"
                type="text"
                placeholder="ej: 0.5"
                value={posX}
                onChange={(e) => setPosX(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="posY">Posición Y (m)</Label>
              <Input
                id="posY"
                type="text"
                placeholder="ej: 0.3"
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

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Carga
            </Button>
            {charges.length > 0 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClearCharges}
              >
                Limpiar Todo
              </Button>
            )}
          </div>
        </form>

        {/* List of charges */}
        {charges.length > 0 && (
          <div className="mt-6 space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Cargas Agregadas:</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {charges.map((charge, index) => (
                <div
                  key={charge.id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-md border"
                >
                  <div className="flex-1">
                    <span className="font-medium">q{index + 1}:</span>{' '}
                    <span className={charge.magnitude > 0 ? 'text-red-600' : 'text-blue-600'}>
                      {(charge.magnitude * 1e6).toExponential(2)} μC
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({charge.position.x.toFixed(2)}, {charge.position.y.toFixed(2)}) m
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveCharge(charge.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
