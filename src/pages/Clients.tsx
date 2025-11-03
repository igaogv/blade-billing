import { useState } from "react";
import { ClientTable } from "@/components/clients/ClientTable";
import { NewClientModal } from "@/components/clients/NewClientModal";

export const Clients = () => {
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  return ( // <-- A palavra 'return' estava faltando aqui
    <div className="space-y-6">
      <ClientTable onNewClient={() => setShowNewClientModal(true)} />
      
      <NewClientModal
        open={showNewClientModal}
        onOpen-change={setShowNewClientModal}
      />
    </div>
  );
};