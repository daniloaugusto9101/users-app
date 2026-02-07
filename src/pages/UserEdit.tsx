import { useParams, useNavigate } from "react-router"
import { useState } from "react"

import { toast } from "sonner"
import type { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function UserEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const user = mockUsers.find((u) => u.id === id)

  const [formData, setFormData] = useState<Partial<User>>(
    user || {
      name: "",
      email: "",
      type: "Usuário",
      status: "Ativo",
    },
  )
  const [isLoading, setIsLoading] = useState(false)

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
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
      toast.error("Por favor, preencha todos os campos obrigatórios")
      return
    }

    setIsLoading(true)

    // Simular chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast.success("Usuário atualizado com sucesso!")
    navigate("/")
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
            <CardDescription>
              Atualize as informações do usuário
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Digite o nome completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="usuario@exemplo.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Perfil *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: User["type"]) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione o perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Gerente">Gerente</SelectItem>
                  <SelectItem value="Usuário">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="status">Status</Label>
                <div className="text-sm text-muted-foreground">
                  {formData.status === "Ativo"
                    ? "O usuário pode acessar o sistema"
                    : "O usuário não pode acessar o sistema"}
                </div>
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
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/")}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
