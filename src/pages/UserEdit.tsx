import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import useEditUser from "@/hooks/useEditUser";
import useFethUserDetails from "@/hooks/useFethUserDetails";
import type { User } from "@/types/user";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export function UserEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = useFethUserDetails(id);

  const { editUser } = useEditUser();

  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    type: "usuario",
    status: "Ativo",
  });

  const [isLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        type: user.type || "usuario",
        status: user.status || "Ativo",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const updatedUser = await editUser({ ...formData, id: Number(id) } as User);

    if (!updatedUser) {
      toast.error("Erro ao atualizar usuário");
      return;
    }

    toast.success("Usuário atualizado com sucesso!");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">Usuário não encontrado</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Button variant="ghost" onClick={() => navigate("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Editar Usuário</CardTitle>
            <CardDescription>Atualize as informações do usuário</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Digite o nome completo" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="usuario@exemplo.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Perfil *</Label>
              <Select value={formData.type} onValueChange={(value: User["type"]) => setFormData({ ...formData, type: value })}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione o perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="gerente">Gerente</SelectItem>
                  <SelectItem value="usuario">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="status">Status</Label>
                <div className="text-sm text-muted-foreground">{formData.status === "Ativo" ? "O usuário pode acessar o sistema" : "O usuário não pode acessar o sistema"}</div>
              </div>
              <Switch
                id="status"
                checked={formData.status === "Ativo"}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    status: checked ? "Ativo" : "Inativo",
                  })
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate("/")} disabled={isLoading}>
              Cancelar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
