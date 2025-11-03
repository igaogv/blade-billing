import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Esta linha agora vai funcionar
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      const { access_token } = response.data;

      if (access_token) {
        await login(access_token);
      } else {
        throw new Error("Token de acesso não recebido.");
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Email ou senha inválidos.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="dashboard-card">
          <CardHeader className="space-y-1 text-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <CardTitle className="text-2xl font-bold">BarberSaaS</CardTitle>
            <CardDescription>
              Entre na sua conta para gerenciar sua barbearia
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
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
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary" 
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
              
              <div className="text-center space-y-2">
                <Button variant="link" size="sm" className="text-muted-foreground">
                  Esqueceu sua senha?
                </Button>
                <p className="text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto text-primary"
                    onClick={() => navigate("/cadastro")}
                  >
                    Cadastre-se
                  </Button>
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};