import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContractCard, { ContractProps } from "@/components/ContractCard";
import { Plus, X } from "lucide-react";

const mockContracts: ContractProps[] = [
  {
    id: "1",
    name: "Стандартный контракт",
    description: "Обменяйте 10 предметов на 1 предмет высшего качества",
    inputAmount: 1000,
    outputRate: 35,
    imageUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=300&h=200&fit=crop"
  },
  {
    id: "2",
    name: "Премиум контракт",
    description: "Обменяйте 5 предметов на 1 редкий предмет",
    inputAmount: 2500,
    outputRate: 25,
    imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=200&fit=crop"
  },
  {
    id: "3",
    name: "VIP контракт",
    description: "Обменяйте 3 редких предмета на 1 эксклюзивный предмет",
    inputAmount: 5000,
    outputRate: 15,
    imageUrl: "https://images.unsplash.com/photo-1607853554457-5fd0bec02561?w=300&h=200&fit=crop"
  }
];

const ContractsPage = () => {
  const [items, setItems] = useState([
    { id: 1, selected: false, name: "AK-47 | Redline", price: 120, imageUrl: "https://images.unsplash.com/photo-1559583109-3e7968e11a13?w=100&h=100&fit=crop" },
    { id: 2, selected: false, name: "AWP | Asiimov", price: 250, imageUrl: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=100&h=100&fit=crop" },
    { id: 3, selected: false, name: "M4A4 | Howl", price: 1200, imageUrl: "https://images.unsplash.com/photo-1605806616949-59450e59f5a5?w=100&h=100&fit=crop" },
    { id: 4, selected: false, name: "Glock-18 | Fade", price: 450, imageUrl: "https://images.unsplash.com/photo-1563219996-35e5e184da76?w=100&h=100&fit=crop" },
  ]);
  
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  const toggleItemSelection = (id: number) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setItems(updatedItems);
    
    const updatedSelectedIds = updatedItems
      .filter(item => item.selected)
      .map(item => item.id);
    setSelectedItems(updatedSelectedIds);
  };
  
  const totalValue = items
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Контракты</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Создать свой контракт</h2>
          
          <Card className="bg-card border-none shadow-lg mb-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Выбранные предметы ({selectedItems.length})</h3>
                <div className="text-yellow-400 font-medium">₽ {totalValue.toFixed(2)}</div>
              </div>
              
              <div className="grid grid-cols-5 gap-2 mb-4">
                {selectedItems.map(id => {
                  const item = items.find(i => i.id === id);
                  if (!item) return null;
                  
                  return (
                    <div key={id} className="relative group">
                      <div className="bg-muted rounded-md w-full aspect-square overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button 
                        className="absolute -top-1 -right-1 bg-destructive rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => toggleItemSelection(id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
                
                {Array.from({ length: 5 - selectedItems.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="bg-muted/30 rounded-md w-full aspect-square flex items-center justify-center border border-dashed border-muted">
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Шанс на успех</span>
                  <span className="text-green-400">{Math.max(0, 50 - selectedItems.length * 5)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full" 
                    style={{ width: `${Math.max(0, 50 - selectedItems.length * 5)}%` }} 
                  />
                </div>
              </div>
              
              <Button 
                className="w-full" 
                disabled={selectedItems.length < 3}
              >
                {selectedItems.length < 3 
                  ? `Выберите еще ${3 - selectedItems.length} предмета` 
                  : "Создать контракт"}
              </Button>
            </CardContent>
          </Card>
          
          <div>
            <h3 className="font-medium mb-3">Ваш инвентарь</h3>
            <div className="grid grid-cols-5 gap-3">
              {items.map(item => (
                <div 
                  key={item.id} 
                  className={`bg-card rounded-md cursor-pointer overflow-hidden transition-all ${
                    item.selected ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-muted-foreground"
                  }`}
                  onClick={() => toggleItemSelection(item.id)}
                >
                  <div className="w-full aspect-square overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <div className="text-xs truncate">{item.name}</div>
                    <div className="text-xs text-yellow-400">₽ {item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Готовые контракты</h2>
          <div className="grid grid-cols-1 gap-4">
            {mockContracts.map(contract => (
              <ContractCard key={contract.id} {...contract} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractsPage;
