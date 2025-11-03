import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import api from "@/lib/api"; // Importamos nossa API

export const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    barbershopName: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Faz a chamada REAL para a API de registro no backend
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        barbershopName: formData.barbershopName,
      });

      toast({
        title: "Conta criada!",
        description: "Sua conta foi criada com sucesso. Redirecionando...",
      });

      // 2. Se o cadastro deu certo, faz o login automaticamente
      const loginResponse = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      const { access_token } = loginResponse.data;
      if (access_token) {
        localStorage.setItem('authToken', access_token);
        navigate("/"); // Navega para o Dashboard
      }

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Não foi possível criar a conta. Tente novamente.";
      toast({
        title: "Erro no cadastro",
        description: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // O resto do componente continua igual
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="dashboard-card">
          <CardHeader className="space-y-1 text-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
            <CardDescription>
              Configure sua barbearia no BarberSaaS
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="barbershopName">Nome da barbearia</Label>
                <Input
                  id="barbershopName"
                  placeholder="Nome da sua barbearia"
                  value={formData.barbershopName}
                  onChange={(e) => setFormData(prev => ({ ...prev, barbershopName: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary" 
                disabled={loading}
              >
                {loading ? "Criando conta..." : "Criar conta"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto text-primary"
                  onClick={() => navigate("/login")}
                >
                  Faça login
                </Button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};