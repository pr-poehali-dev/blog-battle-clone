import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface CaseItem {
  id: string;
  name: string;
  imageUrl: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  price: number;
}

export interface CaseProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  items: CaseItem[];
}

const rarityColors = {
  common: "border-gray-400",
  uncommon: "border-blue-400",
  rare: "border-purple-400",
  epic: "border-pink-500",
  legendary: "border-yellow-500"
};

const CaseCard = ({ name, imageUrl, price, items }: CaseProps) => {
  return (
    <Card className="overflow-hidden bg-card border-none shadow-lg h-full">
      <CardContent className="p-0 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img 
          src={imageUrl || "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=300&h=200&fit=crop"} 
          alt={name} 
          className="w-full h-48 object-cover" 
        />
        <div className="absolute bottom-2 left-2 z-20 text-white">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-yellow-400 font-medium">₽ {price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-3 pt-2 bg-card">
        <div className="flex -space-x-2">
          {items.slice(0, 3).map((item, index) => (
            <div 
              key={index} 
              className={`w-8 h-8 rounded-full border-2 ${rarityColors[item.rarity]} overflow-hidden bg-black`}
            >
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {items.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-card border-2 border-gray-700 flex items-center justify-center text-xs font-bold">
              +{items.length - 3}
            </div>
          )}
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90">Открыть</Button>
      </CardFooter>
    </Card>
  );
};

export default CaseCard;
