import { useState } from 'react';
import { ChargeInput } from './components/ChargeInput';
import { TargetChargeInput } from './components/TargetChargeInput';
import { ChargeVisualization } from './components/ChargeVisualization';
import { ForceCalculation } from './components/ForceCalculation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Info } from 'lucide-react';

export interface Charge {
  id: string;
  magnitude: number; // en Coulombs (C)
  position: { x: number; y: number }; // en metros (m)
}

export interface TargetCharge {
  magnitude: number; // en Coulombs (C)
  position: { x: number; y: number }; // en metros (m)
}

function App() {
  const [charges, setCharges] = useState<Charge[]>([]);
  const [targetCharge, setTargetCharge] = useState<TargetCharge | null>(null);

  const addCharge = (magnitude: number, position: { x: number; y: number }) => {
    const newCharge: Charge = {
      id: Date.now().toString(),
      magnitude,
      position,
    };
    setCharges([...charges, newCharge]);
  };

  const removeCharge = (id: string) => {
    setCharges(charges.filter(charge => charge.id !== id));
  };

  const clearCharges = () => {
    setCharges([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Principio de Superposición – Ley de Coulomb
          </h1>
          <p className="text-lg text-gray-600">
            Calculadora de Fuerza Neta entre Cargas Puntuales
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong>Ley de Coulomb:</strong> F = k · |q₁ · q₂| / r²
                </p>
                <p>
                  <strong>Constante de Coulomb (k):</strong> 8.99 × 10⁹ N·m²/C²
                </p>
                <p>
                  <strong>Principio de Superposición:</strong> La fuerza neta es la suma vectorial de todas las fuerzas individuales.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <Tabs defaultValue="target" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="target">Carga Objetivo</TabsTrigger>
                <TabsTrigger value="charges">Cargas Puntuales</TabsTrigger>
              </TabsList>
              <TabsContent value="target">
                <TargetChargeInput 
                  onSetTarget={setTargetCharge}
                  currentTarget={targetCharge}
                />
              </TabsContent>
              <TabsContent value="charges">
                <ChargeInput 
                  onAddCharge={addCharge}
                  onClearCharges={clearCharges}
                  charges={charges}
                  onRemoveCharge={removeCharge}
                />
              </TabsContent>
            </Tabs>

            {/* Force Calculation Results */}
            {targetCharge && charges.length > 0 && (
              <ForceCalculation 
                charges={charges}
                targetCharge={targetCharge}
              />
            )}
          </div>

          {/* Right Column - Visualization */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Visualización</CardTitle>
                <CardDescription>
                  Cargas y vectores de fuerza en el plano XY
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChargeVisualization 
                  charges={charges}
                  targetCharge={targetCharge}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
