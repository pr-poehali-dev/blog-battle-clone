import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowDownToLine } from "lucide-react";

const UserBalance = () => {
  const [balance, setBalance] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <div className="bg-card rounded-md px-3 py-1.5 flex items-center">
        <span className="text-yellow-400 font-semibold mr-1">₽</span>
        <span className="font-medium">{balance.toFixed(2)}</span>
      </div>
      <Button size="sm" variant="outline" className="gap-1">
        <Plus className="h-4 w-4" />
        <span>Пополнить</span>
      </Button>
      <Button size="sm" variant="outline" className="gap-1">
        <ArrowDownToLine className="h-4 w-4" />
        <span>Вывод</span>
      </Button>
    </div>
  );
};

export default UserBalance;
