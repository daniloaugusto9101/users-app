import api from "@/config/http";

const getUsers = async () => {
    const { data } = await api.get('/users');
    return data;
};
const getUserDetails = async (idUser: string) => {
    const { data } = await api.get(`/users/id/${idUser}`);
    return data;
};

const deleteUser = async (idUser: string) => {
    const { data } = await api.delete(`/users/id/${idUser}`);
    return data;
};

// const postCar = async (car) => {
//     const { data } = await api.post(`/cars/`, car);
//     return data;
// };


// const postFinance = async (cliente) => {
//     const { data } = await api.post(`/cars/finance`, cliente);
//     return data;
// };

// const editCar = async (idCar, updatedCarData) => {
//     const { data } = await api.put(`/cars/${idCar}`, updatedCarData);
//     return data;
// };

export default {
    getUsers,
    getUserDetails,
    deleteUser
    // postCar,
    // deleteCar,
    // postFinance,
    // editCar,
};
