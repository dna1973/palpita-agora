import { Trophy, User, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Palpita Agora</h1>
              <p className="text-xs text-muted-foreground">Bolões Esportivos</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Bolões
            </a>
            <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Enquetes
            </a>
            <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Rankings
            </a>
            {isAdmin && (
              <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Admin
              </a>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.email}</p>
                      {isAdmin && (
                        <p className="text-xs text-primary font-medium">Administrador</p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="hidden sm:flex"
                >
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
                <Button 
                  className="btn-premium hidden sm:block"
                  onClick={() => setShowAuthModal(true)}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Cadastrar
                </Button>
                
                {/* Mobile Login */}
                <Button 
                  size="icon"
                  variant="ghost"
                  className="sm:hidden"
                  onClick={() => setShowAuthModal(true)}
                >
                  <LogIn className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
}