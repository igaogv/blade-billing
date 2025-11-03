export class CreateClientDto {
  name: string;
  email: string;
  phone: string;
  monthlyValue: number;
  notes?: string;
  userId: string; // <-- adicione isso
}
