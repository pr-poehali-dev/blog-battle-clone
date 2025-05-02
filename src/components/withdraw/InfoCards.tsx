
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, Wallet } from "lucide-react";

const InfoCards = () => {
  return (
    <>
      <Card className="bg-card border-none shadow-lg mb-4">
        <CardHeader>
          <CardTitle>Информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Время обработки</h3>
              <p className="text-sm text-muted-foreground">
                Зависит от выбранного способа вывода
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Минимальная сумма</h3>
              <p className="text-sm text-muted-foreground">
                От 500 ₽ в зависимости от платежной системы
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-amber-950/50 border-amber-900 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-500">Внимание</h3>
              <p className="text-sm text-amber-500/80 mt-1">
                Для вывода средств необходимо пройти проверку аккаунта и подтвердить личность.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default InfoCards;
