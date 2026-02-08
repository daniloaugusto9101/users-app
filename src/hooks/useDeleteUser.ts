import UserServices from '@/service/UserServices';
import React from 'react';

const useDeleteUser = () => {
  const [isDeletingUser, setIsDeletingUser] = React.useState(false);
  const [deleteUserError, setDeleteUserError] = React.useState<string | null>(null);

  const deleteUser = async (idUser: string) => {
    setIsDeletingUser(true);
    setDeleteUserError(null);

    try {
      const deleteuser = await UserServices.deleteUser(idUser);
      return deleteuser;
    } catch (err) {
      setDeleteUserError('Erro ao deletar usuário');
      return false;
    } finally {
      setIsDeletingUser(false);
    }
  };

  return {
    deleteUser,
    isDeletingUser,
    deleteUserError,
  };
};

export default useDeleteUser;