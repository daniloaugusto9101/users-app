import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { mockUsers } from "@/lib/mock-data"
import { Eye, Mail, Pencil, Trash2 } from "lucide-react"
import React from "react"
import type { User } from "@/types/user"
import HeaderUserList from "@/components/HeaderUserList"
import { useNavigate } from "react-router-dom"

export default function UserList() {
  const [users, setUsers] = React.useState<User[]>(mockUsers)
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Header */}
      <HeaderUserList />

      {/* Cards Grid */}
      {users.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            Nenhum usuário encontrado
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card
              key={user.id}
              className="group relative overflow-hidden hover:shadow-md transition-all"
            >
              {/* Status Badge no canto */}
              <div className="absolute top-3 right-3">
                <Badge
                  variant={user.status === "Ativo" ? "default" : "secondary"}
                >
                  {user.status}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-lg font-semibold text-primary">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">
                      {user.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {user.profile}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t bg-muted/30">
                <div className="flex gap-1 w-full">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 h-8"
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    Visualizar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 h-8"
                    onClick={() => navigate(`/users/${user.id}/edit`)}
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8"
                    // onClick={() => setUserToDelete(user)}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
