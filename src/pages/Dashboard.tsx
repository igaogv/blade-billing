import { MetricCard } from "@/components/dashboard/MetricCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, CreditCard, TrendingUp, AlertCircle } from "lucide-react";

const recentBillings = [
  {
    id: "1",
    client: "Carlos Silva",
    amount: 89.90,
    status: "paid",
    date: "2024-01-15"
  },
  {
    id: "2",
    client: "João Santos",
    amount: 89.90,
    status: "pending",
    date: "2024-01-10"
  },
  {
    id: "3",
    client: "Pedro Costa",
    amount: 89.90,
    status: "overdue",
    date: "2023-12-15"
  },
];

const statusLabels = {
  paid: "Pago",
  pending: "Pendente", 
  overdue: "Vencido"
};

export const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe o desempenho da sua barbearia
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Clientes Ativos"
          value="127"
          description="Total de clientes ativos"
          icon={Users}
          trend={{ value: 12, label: "vs. mês anterior" }}
        />
        <MetricCard
          title="Receita Mensal"
          value="R$ 11.420"
          description="Receita recorrente mensal"
          icon={TrendingUp}
          trend={{ value: 8, label: "vs. mês anterior" }}
        />
        <MetricCard
          title="Cobranças Geradas"
          value="89"
          description="Este mês"
          icon={CreditCard}
          trend={{ value: -3, label: "vs. mês anterior" }}
        />
        <MetricCard
          title="Pendências"
          value="12"
          description="Cobranças em atraso"
          icon={AlertCircle}
          trend={{ value: -25, label: "vs. mês anterior" }}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Billings */}
        <div className="dashboard-card p-6">
          <h3 className="text-lg font-semibold mb-4">Cobranças Recentes</h3>
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBillings.map((billing) => (
                  <TableRow key={billing.id}>
                    <TableCell className="font-medium">{billing.client}</TableCell>
                    <TableCell>R$ {billing.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={`status-${billing.status}`}>
                        {statusLabels[billing.status as keyof typeof statusLabels]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-card p-6">
          <h3 className="text-lg font-semibold mb-4">Estatísticas Rápidas</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Taxa de Conversão</span>
              <span className="font-semibold">94.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Ticket Médio</span>
              <span className="font-semibold">R$ 89,90</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Churn Rate</span>
              <span className="font-semibold text-success">2.1%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Novos Clientes</span>
              <span className="font-semibold">+8 este mês</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};