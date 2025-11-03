import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Plus } from "lucide-react";
import { NewBillingModal } from "@/components/billing/NewBillingModal"; // Importe o novo modal

interface Billing {
  id: string;
  client: { name: string }; // Ajuste para refletir o objeto aninhado
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate: string | null;
}

const statusLabels = {
  paid: "Pago",
  pending: "Pendente",
  overdue: "Vencido"
};

const fetchBillings = async (): Promise<Billing[]> => {
  const { data } = await api.get('/billing');
  return data;
}

export const Billings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewBillingModal, setShowNewBillingModal] = useState(false);

  const { data: billings = [], isLoading, isError } = useQuery<Billing[]>({
    queryKey: ['billings'],
    queryFn: fetchBillings,
  });

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div>
            <h2 className="text-2xl font-bold">Cobranças</h2>
            <p className="text-muted-foreground">
              Gerencie todas as cobranças mensais
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            {/* Botão para abrir o modal */}
            <Button onClick={() => setShowNewBillingModal(true)} className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Nova Cobrança
            </Button>
          </div>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="dashboard-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Pago em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow><TableCell colSpan={5} className="text-center">Carregando...</TableCell></TableRow>
              )}
              {isError && (
                <TableRow><TableCell colSpan={5} className="text-center text-destructive">Falha ao carregar cobranças.</TableCell></TableRow>
              )}
              {!isLoading && !isError && billings.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center">Nenhuma cobrança encontrada.</TableCell></TableRow>
              )}
              {!isLoading && !isError && billings.map((billing) => (
                <TableRow key={billing.id}>
                  <TableCell className="font-medium">{billing.client.name}</TableCell>
                  <TableCell>R$ {billing.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={`status-${billing.status}`}>
                      {statusLabels[billing.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(billing.dueDate).toLocaleDateString("pt-BR", { timeZone: 'UTC' })}
                  </TableCell>
                  <TableCell>
                    {billing.paidDate ? 
                      new Date(billing.paidDate).toLocaleDateString("pt-BR", { timeZone: 'UTC' }) : 
                      "-"
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Renderiza o modal */}
      <NewBillingModal 
        open={showNewBillingModal} 
        onOpenChange={setShowNewBillingModal} 
      />
    </>
  );
};