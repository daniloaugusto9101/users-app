import HeaderUserList from "@/components/HeaderUserList";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useDeleteUser from "@/hooks/useDeleteUser";
import useFetchUsers from "@/hooks/useFetchUsers";
import type { User } from "@/types/user";
import { Eye, Loader2, Mail, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function UserList() {
  const navigate = useNavigate();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { users, fetchUsers, isFetchingUsers, fetchUsersError } = useFetchUsers();
  const { deleteUser, isDeletingUser } = useDeleteUser();

  const handleDelete = async () => {
    if (!userToDelete) return;

    const success = await deleteUser(userToDelete.id.toString());

    if (success) {
      toast.success("Usuário excluído com sucesso!");
      setUserToDelete(null);
      fetchUsers();
    } else {
      toast.error("Erro ao excluir usuário");
    }
  };

  if (isFetchingUsers) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (fetchUsersError) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-destructive">{fetchUsersError}</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <HeaderUserList />

      {users.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">Nenhum usuário encontrado</CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card key={user.id} className="group relative overflow-hidden hover:shadow-md transition-all">
              <div className="absolute top-3 right-3">
                <Badge variant={user.status === "Ativo" ? "default" : "secondary"}>ID: {user.id}</Badge>
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
                    <CardTitle className="text-base truncate">{user.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{user.type}</p>
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
                  <Button variant="ghost" size="sm" className="flex-1 h-8" onClick={() => navigate(`/users/${user.id}`)}>
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    Visualizar
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 h-8" onClick={() => navigate(`/users/${user.id}/edit`)}>
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8" onClick={() => setUserToDelete(user)}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o usuário <strong>{userToDelete?.name}</strong>? Esta ação é irreversível e não poderá ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletingUser}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeletingUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isDeletingUser ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Confirmar exclusão"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
