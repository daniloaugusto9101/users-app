import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeaderUserList() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Usuários</h2>
        <p className="text-muted-foreground">Gerencie os usuários do sistema</p>
      </div>
      <Button onClick={() => navigate("/users/new")}>
        <UserPlus className="mr-2 h-4 w-4" />
        Novo Usuário
      </Button>
    </div>
  );
}
