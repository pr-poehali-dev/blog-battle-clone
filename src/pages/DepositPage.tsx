import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Wallet, ShieldCheck } from "lucide-react";

const paymentMethods = [
  { id: "card", name: "Банковская карта", icon: CreditCard, fee: "0%" },
  { id: "qiwi", name: "QIWI", icon: Wallet, fee: "2%" },
  { id: "webmoney", name: "WebMoney", icon: Wallet, fee: "1%" },
  { id: "crypto", name: "Криптовалюта", icon: ShieldCheck, fee: "0%" },
];

const promoButtons = [100, 500, 1000, 2500, 5000];

const DepositPage = () => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const [promoCode, setPromoCode] = useState("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handlePromoButtonClick = (value: number) => {
    setAmount(value.toString());
  };

  const handleDeposit = () => {
    console.log({ amount, selectedMethod, promoCode });
    // Здесь должна быть интеграция с платежным шлюзом
  };

  const getSelectedMethodFee = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    return method ? method.fee : "0%";
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Пополнение баланса</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="bg-card border-none shadow-lg">
            <CardHeader>
              <CardTitle>Выберите способ оплаты</CardTitle>
              <CardDescription>
                Выберите удобный способ пополнения баланса
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue={selectedMethod} onValueChange={setSelectedMethod}>
                <TabsList className="bg-background grid grid-cols-4 mb-6">
                  {paymentMethods.map(method => (
                    <TabsTrigger key={method.id} value={method.id} className="flex items-center">
                      <method.icon className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">{method.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {paymentMethods.map(method => (
                  <TabsContent key={method.id} value={method.id} className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Сумма пополнения</h3>
                      <div className="flex gap-2 flex-wrap mb-4">
                        {promoButtons.map(value => (
                          <Button 
                            key={value}
                            variant="outline" 
                            onClick={() => handlePromoButtonClick(value)}
                            className={amount === value.toString() ? "bg-primary text-primary-foreground" : ""}
                          >
                            {value} ₽
                          </Button>
                        ))}
                      </div>
                      <Input 
                        type="text" 
                        placeholder="Введите сумму"
                        value={amount}
                        onChange={handleAmountChange}
                        className="bg-background text-lg h-12"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Промокод</h3>
                      <Input 
                        type="text" 
                        placeholder="Введите промокод"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex flex-col items-stretch space-y-4">
              <div className="flex justify-between text-sm">
                <span>Комиссия:</span>
                <span>{getSelectedMethodFee()}</span>
              </div>
              <Button 
                className="w-full text-lg py-6" 
                size="lg"
                onClick={handleDeposit}
                disabled={!amount || parseInt(amount) < 100}
              >
                {!amount || parseInt(amount) < 100 
                  ? "Минимальная сумма 100 ₽" 
                  : `Пополнить на ${amount} ₽`}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="bg-card border-none shadow-lg">
            <CardHeader>
              <CardTitle>Преимущества</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Безопасные платежи</h3>
                  <p className="text-sm text-muted-foreground">Все транзакции защищены</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Мгновенное зачисление</h3>
                  <p className="text-sm text-muted-foreground">Деньги поступят на счёт моментально</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Бонусы за пополнение</h3>
                  <p className="text-sm text-muted-foreground">Получайте до +15% при пополнении</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
