import { useState } from 'react';
import UserServices from '@/service/UserServices';
import type { User } from '@/types/user';

type CreateUserPayload = Omit<User, 'id'>;

const useCreateUser = () => {
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [createUserError, setCreateUserError] = useState<string | null>(null);

  const createUser = async (payload: CreateUserPayload) => {
    setIsCreatingUser(true);
    setCreateUserError(null);

    try {
      const newUser = await UserServices.createUser(payload);
      return newUser;
    } catch (err) {
      setCreateUserError('Erro ao criar usuário');
      return null;
    } finally {
      setIsCreatingUser(false);
    }
  };

  return {
    createUser,
    isCreatingUser,
    createUserError,
  };
};

export default useCreateUser;
