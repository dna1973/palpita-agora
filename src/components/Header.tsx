import { Trophy, User, LogIn, LogOut, LayoutDashboard, Menu } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  const handleAuthModalOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAuthModal(true);
    setMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center shadow-soft">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gradient-brand">Palpita Agora</h1>
              <p className="text-xs text-muted-foreground">Bolões Esportivos</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-gradient-brand">Palpita Agora</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {user && (
              <>
                <a 
                  href="/dashboard/pools" 
                  className="text-sm font-medium text-foreground hover:text-brand-600 transition-fast px-3 py-2 rounded-md hover:bg-brand-50"
                >
                  Meus Bolões
                </a>
                <a 
                  href="/dashboard/ranking" 
                  className="text-sm font-medium text-foreground hover:text-brand-600 transition-fast px-3 py-2 rounded-md hover:bg-brand-50"
                >
                  Ranking
                </a>
                <a 
                  href="/dashboard/stats" 
                  className="text-sm font-medium text-foreground hover:text-brand-600 transition-fast px-3 py-2 rounded-md hover:bg-brand-50"
                >
                  Estatísticas
                </a>
                {isAdmin && (
                  <a 
                    href="#" 
                    className="text-sm font-medium text-success hover:text-success-600 transition-fast px-3 py-2 rounded-md hover:bg-success-50"
                  >
                    Admin
                  </a>
                )}
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full hover:shadow-soft">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 shadow-medium">
                  <div className="flex items-center justify-start gap-2 p-3">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-foreground">{user.email}</p>
                      {isAdmin && (
                        <p className="text-xs text-success font-medium">Administrador</p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/dashboard" className="flex items-center cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
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
                  onClick={handleAuthModalOpen}
                  className="hover:shadow-soft"
                >
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
                <Button 
                  variant="brand"
                  size="sm"
                  onClick={handleAuthModalOpen}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Cadastrar
                </Button>
              </>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center space-x-2">
            <ThemeToggle />
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                  <SheetDescription className="text-left">
                    Navegue pela plataforma
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {user ? (
                    <>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="font-medium text-foreground">{user.email}</p>
                        {isAdmin && (
                          <p className="text-sm text-success font-medium mt-1">Administrador</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          asChild
                        >
                          <a href="/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                          </a>
                        </Button>
                        
                        {isAdmin && (
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start"
                          >
                            <User className="mr-2 h-4 w-4" />
                            Admin
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-error hover:text-error hover:bg-error-50" 
                          onClick={handleSignOut}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sair
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={handleAuthModalOpen}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Entrar
                      </Button>
                      <Button 
                        variant="brand" 
                        className="w-full justify-start" 
                        onClick={handleAuthModalOpen}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Cadastrar
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
}