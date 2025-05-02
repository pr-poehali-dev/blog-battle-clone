import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarTrigger, 
  SidebarHeader, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import UserBalance from "@/components/UserBalance";
import { 
  Package, 
  Layers, 
  ArrowUpRight, 
  RefreshCw, 
  LogIn, 
  CreditCard,
  ArrowDownToLine, 
  LogOut, 
  Settings, 
  HelpCircle 
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { path: "/", label: "Кейсы", icon: Package },
    { path: "/upgrades", label: "Апгрейды", icon: ArrowUpRight },
    { path: "/contracts", label: "Контракты", icon: RefreshCw },
    { path: "/deposit", label: "Пополнение", icon: CreditCard },
    { path: "/withdraw", label: "Вывод", icon: ArrowDownToLine },
  ];

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center justify-between pl-2">
            <Logo />
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.path}
                  tooltip={item.label}
                >
                  <Link to={item.path}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter>
          {isLoggedIn ? (
            <div className="px-3 py-2">
              <UserBalance />
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="ghost" size="sm" className="justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Настройки</span>
                </Button>
                <Button variant="ghost" size="sm" className="justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Поддержка</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="justify-start text-destructive hover:text-destructive"
                  onClick={toggleLogin}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-3">
              <Button className="w-full mb-2" onClick={toggleLogin}>
                <LogIn className="mr-2 h-4 w-4" />
                <span>Войти</span>
              </Button>
              <Button variant="outline" className="w-full">
                Регистрация
              </Button>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
