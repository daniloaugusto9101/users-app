import UserServices from '@/service/UserServices';

const useDeleteUser = () => {
  const deleteUser = (idUser: string) => {
    return UserServices.deleteUser(idUser);
  };

  return { deleteUser };
};

export default useDeleteUser;