import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

export interface ContractProps {
  id: string;
  name: string;
  description: string;
  inputAmount: number;
  outputRate: number;
  imageUrl: string;
}

const ContractCard = ({ name, description, inputAmount, outputRate, imageUrl }: ContractProps) => {
  return (
    <Card className="overflow-hidden bg-card border-none shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <RefreshCw className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Стоимость</p>
            <p className="text-yellow-400 font-medium">₽ {inputAmount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Шанс выигрыша</p>
            <p className="text-green-400 font-medium">{outputRate}%</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-card p-4 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90">Создать контракт</Button>
      </CardFooter>
    </Card>
  );
};

export default ContractCard;
