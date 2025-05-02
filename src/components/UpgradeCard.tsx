import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export interface UpgradeProps {
  id: string;
  name: string;
  multiplier: number;
  minAmount: number;
  maxAmount: number;
  successRate: number;
}

const UpgradeCard = ({ name, multiplier, minAmount, maxAmount, successRate }: UpgradeProps) => {
  return (
    <Card className="overflow-hidden bg-card border-none shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
            <ArrowUpRight className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">
              x{multiplier.toFixed(2)} множитель
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Мин/Макс ставка</p>
            <p className="text-yellow-400 font-medium">
              ₽ {minAmount.toFixed(0)} - {maxAmount.toFixed(0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Шанс успеха</p>
            <p className="text-green-400 font-medium">{successRate}%</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-card p-4 pt-0">
        <Button className="w-full bg-purple-600 hover:bg-purple-700">Апгрейд</Button>
      </CardFooter>
    </Card>
  );
};

export default UpgradeCard;
