import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import UpgradeCard, { UpgradeProps } from "@/components/UpgradeCard";

const mockUpgrades: UpgradeProps[] = [
  {
    id: "1",
    name: "X2 Апгрейд",
    multiplier: 2,
    minAmount: 100,
    maxAmount: 10000,
    successRate: 48
  },
  {
    id: "2",
    name: "X3 Апгрейд",
    multiplier: 3,
    minAmount: 100,
    maxAmount: 7000,
    successRate: 32
  },
  {
    id: "3",
    name: "X5 Апгрейд",
    multiplier: 5,
    minAmount: 100,
    maxAmount: 5000,
    successRate: 19
  },
  {
    id: "4",
    name: "X10 Апгрейд",
    multiplier: 10,
    minAmount: 100,
    maxAmount: 2000,
    successRate: 9.5
  }
];

const UpgradesPage = () => {
  const [amount, setAmount] = useState(100);
  const [multiplier, setMultiplier] = useState(2);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setAmount(Math.max(100, Math.min(10000, value)));
    }
  };

  const successRate = 100 / multiplier - 2;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Апгрейды</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Создать апгрейд</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Сумма апгрейда</label>
              <Input 
                type="number" 
                min="100" 
                max="10000" 
                value={amount}
                onChange={handleAmountChange}
                className="bg-background"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Множитель: x{multiplier.toFixed(2)}</label>
                <span className="text-sm text-green-400">Шанс: {successRate.toFixed(1)}%</span>
              </div>
              <Slider 
                defaultValue={[2]} 
                min={1.1} 
                max={10} 
                step={0.1}
                onValueChange={(values) => setMultiplier(values[0])}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground">Ставка</div>
                <div className="text-yellow-400 font-medium">₽ {amount.toFixed(2)}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Множитель</div>
                <div className="text-purple-400 font-medium">x{multiplier.toFixed(2)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Выигрыш</div>
                <div className="text-green-400 font-medium">₽ {(amount * multiplier).toFixed(2)}</div>
              </div>
            </div>
            
            <Button className="w-full bg-purple-600 hover:bg-purple-700">Создать апгрейд</Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Предустановленные апгрейды</h2>
          <div className="grid grid-cols-1 gap-4">
            {mockUpgrades.map(upgrade => (
              <UpgradeCard key={upgrade.id} {...upgrade} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradesPage;
