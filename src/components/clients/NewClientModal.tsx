import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface NewClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Função que envia os dados do novo cliente para a API
const createClient = async (clientData: { name: string, email: string, phone: string, monthlyValue: number }) => {
  const { data } = await api.post('/clients', clientData);
  return data;
};

export const NewClientModal = ({ open, onOpenChange }: NewClientModalProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    monthlyValue: ""
  });

  const mutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      // Avisa ao React Query para ATUALIZAR a lista de clientes na tabela
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      
      toast({
        title: "Cliente adicionado!",
        description: `${formData.name} foi adicionado com sucesso.`,
      });

      onOpenChange(false); // Fecha o modal
    },
    onError: () => {
      toast({
        title: "Erro ao criar cliente",
        description: "Não foi possível adicionar o cliente. Tente novamente.",
        variant: "destructive"
      });
    },
  });

  // Limpa o formulário quando o modal é fechado
  useEffect(() => {
    if (!open) {
      setFormData({ name: "", email: "", phone: "", monthlyValue: "" });
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      monthlyValue: parseFloat(formData.monthlyValue) || 0
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
          <DialogDescription>
            Adicione um novo cliente ao seu sistema de cobrança mensal.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyValue">Valor Mensal *</Label>
              <Input
                id="monthlyValue"
                type="number"
                step="0.01"
                value={formData.monthlyValue}
                onChange={(e) => setFormData(prev => ({...prev, monthlyValue: e.target.value}))}
                required
              />
            </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutation.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={mutation.isPending} className="bg-gradient-primary">
              {mutation.isPending ? "Salvando..." : "Salvar Cliente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};