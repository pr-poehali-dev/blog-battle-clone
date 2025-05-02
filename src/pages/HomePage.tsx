import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import CaseCard, { CaseProps } from "@/components/CaseCard";

const mockCases: CaseProps[] = [
  {
    id: "1",
    name: "Starter Case",
    imageUrl: "https://images.unsplash.com/photo-1605806616949-59450e59f5a5?w=300&h=200&fit=crop",
    price: 99,
    items: [
      { id: "i1", name: "AK-47 | Redline", imageUrl: "https://images.unsplash.com/photo-1559583109-3e7968e11a13?w=100&h=100&fit=crop", rarity: "uncommon", price: 120 },
      { id: "i2", name: "AWP | Asiimov", imageUrl: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=100&h=100&fit=crop", rarity: "rare", price: 250 },
      { id: "i3", name: "M4A4 | Howl", imageUrl: "https://images.unsplash.com/photo-1605806616949-59450e59f5a5?w=100&h=100&fit=crop", rarity: "legendary", price: 1200 },
      { id: "i4", name: "Glock-18 | Fade", imageUrl: "https://images.unsplash.com/photo-1563219996-35e5e184da76?w=100&h=100&fit=crop", rarity: "epic", price: 450 },
    ]
  },
  {
    id: "2",
    name: "Prime Case",
    imageUrl: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=300&h=200&fit=crop",
    price: 199,
    items: [
      { id: "i5", name: "Desert Eagle | Blaze", imageUrl: "https://images.unsplash.com/photo-1587152022362-233320427fea?w=100&h=100&fit=crop", rarity: "uncommon", price: 220 },
      { id: "i6", name: "USP-S | Kill Confirmed", imageUrl: "https://images.unsplash.com/photo-1605806616949-59450e59f5a5?w=100&h=100&fit=crop", rarity: "rare", price: 350 },
      { id: "i7", name: "Butterfly Knife | Fade", imageUrl: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=100&h=100&fit=crop", rarity: "legendary", price: 3200 },
    ]
  },
  {
    id: "3",
    name: "Premium Case",
    imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=200&fit=crop",
    price: 499,
    items: [
      { id: "i8", name: "AK-47 | Fire Serpent", imageUrl: "https://images.unsplash.com/photo-1604931668626-ab49cb27562e?w=100&h=100&fit=crop", rarity: "epic", price: 1220 },
      { id: "i9", name: "AWP | Dragon Lore", imageUrl: "https://images.unsplash.com/photo-1534375971785-5c1826f739d8?w=100&h=100&fit=crop", rarity: "legendary", price: 9500 },
      { id: "i10", name: "M4A1-S | Hyper Beast", imageUrl: "https://images.unsplash.com/photo-1608160695467-1a61407130f5?w=100&h=100&fit=crop", rarity: "rare", price: 450 },
    ]
  },
  {
    id: "4",
    name: "Elite Case",
    imageUrl: "https://images.unsplash.com/photo-1607853554457-5fd0bec02561?w=300&h=200&fit=crop",
    price: 999,
    items: [
      { id: "i11", name: "Karambit | Doppler", imageUrl: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=100&h=100&fit=crop", rarity: "legendary", price: 3250 },
      { id: "i12", name: "Butterfly | Crimson Web", imageUrl: "https://images.unsplash.com/photo-1605806616949-59450e59f5a5?w=100&h=100&fit=crop", rarity: "epic", price: 2100 },
      { id: "i13", name: "Skeleton Knife | Fade", imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=100&h=100&fit=crop", rarity: "legendary", price: 4750 },
    ]
  },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCases = mockCases.filter(
    caseItem => caseItem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Кейсы CS:GO 2</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск кейсов..."
            className="pl-9 w-[250px] bg-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-card">
          <TabsTrigger value="all">
            Все
            <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/20 font-normal" variant="outline">
              {mockCases.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="new">Новые</TabsTrigger>
          <TabsTrigger value="popular">Популярные</TabsTrigger>
          <TabsTrigger value="exclusive">Эксклюзивные</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCases.map((caseItem) => (
              <CaseCard key={caseItem.id} {...caseItem} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCases.slice(0, 2).map((caseItem) => (
              <CaseCard key={caseItem.id} {...caseItem} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCases.slice(1, 3).map((caseItem) => (
              <CaseCard key={caseItem.id} {...caseItem} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="exclusive" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCases.slice(3, 4).map((caseItem) => (
              <CaseCard key={caseItem.id} {...caseItem} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
