import UserServices from '@/service/UserServices';
import type { User } from '@/types/user';
import { useState } from 'react';


const useEditUser = () => {
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editUserError, setEditUserError] = useState<string | null>(null);

  const editUser = async (payload: User) => {
    setIsEditingUser(true);
    setEditUserError(null);

    try {
      const updatedUser = await UserServices.editUser(payload);
      return updatedUser;
    } catch (err) {
      setEditUserError('Erro ao atualizar usuário');
      return null;
    } finally {
      setIsEditingUser(false);
    }
  };

  return {
    editUser,
    isEditingUser,
    editUserError,
  };
};

export default useEditUser;
