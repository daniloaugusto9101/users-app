import UserServices from "@/service/UserServices";
import type { User } from "@/types/user";
import React from "react";

const useFethUserDetails = (idUser: string | undefined) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    if (!idUser) return;
    UserServices.getUserDetails(idUser)
      .then((resp) => {
        if (Array.isArray(resp) && resp.length > 0) {
          setUser(resp[0]);
        } else if (resp && !Array.isArray(resp)) {
          setUser(resp);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        console.error(`Algo deu errado: ${err}`);
      });
  }, [idUser]);

  return user;
};

export default useFethUserDetails;