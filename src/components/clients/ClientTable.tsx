import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api"; // Lembre-se que criamos este arquivo para a API
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
import { Search, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Interface que define o formato de um cliente
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  monthlyValue?: number; // Usamos '?' para indicar que o valor pode ser opcional
}

interface ClientTableProps {
  onNewClient: () => void;
}

// Função que busca os clientes do backend
const fetchClients = async (): Promise<Client[]> => {
  const { data } = await api.get("/clients");
  return data;
};

export const ClientTable = ({ onNewClient }: ClientTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Hook do React Query para buscar e gerenciar os dados da API
  const { data: clients = [], isLoading, isError } = useQuery<Client[]>({
    queryKey: ["clients"], // Chave única para esta busca
    queryFn: fetchClients, // Função que será executada
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cabeçalho com o botão "Novo Cliente" */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold">Clientes</h2>
          <p className="text-muted-foreground">
            Gerencie seus clientes e suas mensalidades
          </p>
        </div>
        <Button onClick={onNewClient} className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Barra de Busca */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar clientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabela de Clientes */}
      <div className="dashboard-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Valor Mensal</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Carregando clientes...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-destructive">
                  Falha ao carregar clientes. Verifique sua conexão e tente novamente.
                </TableCell>
              </TableRow>
            ) : filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="text-muted-foreground">{client.email}</TableCell>
                  <TableCell>
                    <Badge variant={client.status.toLowerCase() === "active" ? "default" : "secondary"}
                           className={client.status.toLowerCase() === "active" ? "status-paid" : "status-pending"}>
                      {client.status.toLowerCase() === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {/* AQUI ESTÁ A CORREÇÃO para não quebrar a página */}
                    R$ {(client.monthlyValue || 0).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};