import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-9xl md:text-[12rem] font-bold leading-none">
              <span className="text-gradient bg-gradient-to-r from-slate-900 via-emerald-600 to-blue-600 dark:from-slate-100 dark:via-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                404
              </span>
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8 animate-scale-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Página Não Encontrada
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
              Oops! A página que você está procurando não existe.
            </p>
            <p className="text-base text-slate-500 dark:text-slate-500">
              Rota tentada: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">{location.pathname}</code>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              size="lg"
            >
              <Home className="mr-2 h-5 w-5" />
              Voltar ao Início
            </Button>
            
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-2 border-slate-300 dark:border-slate-600 hover:border-primary dark:hover:border-primary bg-transparent hover:bg-primary/5 transition-all duration-300"
              size="lg"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Página Anterior
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-12 p-6 glass border-glass-border rounded-lg animate-fade-in">
            <Search className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
              Precisa de Ajuda?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Verifique se o endereço está correto ou navegue pelos nossos bolões esportivos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
