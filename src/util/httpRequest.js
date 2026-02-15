import axios from "axios";
const API_URL= import.meta.env.VITE_API_URL
export function logIn(lista, user) {
  const foundUser = lista.find(
    (element) =>
      element.email === user.email && element.password === user.password,
  );

  if (!foundUser) {
    throw new Error("Credenziali non valide. Riprova.");
  }
  return foundUser;
}

export async function httpLoader(queryClient) {
  const queryKey = ["products"];
  try {
    return await queryClient.ensureQueryData({
      queryKey,
      queryFn: async () => {
        const response = await axios.get(
         API_URL ,
        );
        return response.data;
      },
    });
  } catch (e) {
    const message =
      e.response?.data?.message ||
      "Errore del server" ||
      e.message
    const error = new Error(message);
    error.status = e.response?.status || 500;

    throw error;
  }
}
