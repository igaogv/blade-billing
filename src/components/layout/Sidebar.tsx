import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  CreditCard,
  Receipt,
  Bell,
  Settings,
  BarChart3,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Clientes", href: "/clientes", icon: Users },
  { name: "Cobranças", href: "/cobrancas", icon: CreditCard },
  { name: "Pagamentos", href: "/pagamentos", icon: Receipt },
  { name: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { name: "Notificações", href: "/notificacoes", icon: Bell },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-sidebar bg-card border-r border-border/50 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <div>
                <h2 className="font-semibold">BarberSaaS</h2>
                <p className="text-xs text-muted-foreground">Menu</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "sidebar-nav-item",
                    isActive && "active"
                  )}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border/50">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium text-sm mb-1">Plano Premium</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Aproveite todos os recursos
              </p>
              <Button size="sm" className="w-full bg-gradient-primary">
                Upgrade
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};