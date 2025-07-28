import React, { useState } from "react";
import { LogIn, UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(loginForm.email, loginForm.password);
    
    if (!error) {
      handleCloseModal();
      setLoginForm({ email: "", password: "" });
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupForm.password !== signupForm.confirmPassword) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    const { error } = await signUp(signupForm.email, signupForm.password, signupForm.username);
    
    if (!error) {
      handleCloseModal();
      setSignupForm({ username: "", email: "", password: "", confirmPassword: "" });
    }
    
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    onOpenChange(false);
  };

  // Modal com design melhorado
  if (open) {
    return (
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={handleCloseModal}
      >
        <div 
          className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-slate-200 dark:border-slate-700 relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-success-50/50 via-transparent to-brand-50/50 dark:from-success-900/20 dark:via-transparent dark:to-brand-900/20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-success-200/20 dark:bg-success-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-200/20 dark:bg-brand-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div className="text-center flex-1">
                <h2 className="text-3xl font-bold mb-2">
                  <span className="text-gradient-brand">
                    Entre no Jogo!
                  </span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base">
                  Participe dos melhores bolões esportivos e faça seus palpites
                </p>
              </div>
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex mb-6 bg-slate-100 dark:bg-slate-700 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  activeTab === 'login'
                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 shadow-lg transform scale-105'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <LogIn className="h-4 w-4" />
                <span>Entrar</span>
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  activeTab === 'signup'
                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 shadow-lg transform scale-105'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <UserPlus className="h-4 w-4" />
                <span>Cadastrar</span>
              </button>
            </div>

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-slate-100 transition-all duration-200"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pl-10 pr-12 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-slate-100 transition-all duration-200"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-brand text-white font-semibold py-3 px-6 rounded-lg transition-normal hover:scale-[1.02] shadow-soft hover:shadow-medium mt-6 disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </button>
              </form>
            )}

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nome de usuário
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <input
                    type="text"
                    value={signupForm.username}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-slate-100 transition-all duration-200"
                    placeholder="Seu nome de usuário"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <input
                    type="email"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-slate-100 transition-all duration-200"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={signupForm.password}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-slate-100 transition-all duration-200"
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Confirmar senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-slate-100 transition-all duration-200"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-brand text-white font-semibold py-3 px-6 rounded-lg transition-normal hover:scale-[1.02] shadow-soft hover:shadow-medium mt-6 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </form>
          )}
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}