import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export async function signUp(user) {
  try {
    const response = await axios.post(`${API_URL}/users/register`, user);

    return response.data;
  } catch (error) {
    console.error(
      "❌ Errore registrazione:",
      error.response?.data || error.message,
    );

    // Gestisci gli errori dal backend
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("Errore di connessione al server");
    } else {
      throw new Error("Errore imprevisto durante la registrazione");
    }
  }
}

export async function logIn(user) {
  try {
    const response = await axios.post(`${API_URL}/users/login`, user);

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Errore nel server");
    }
    const foundUser = response.data;
    return foundUser;
  } catch (error) {
    console.error("❌ Errore login:", error.response?.data || error.message);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Errore di connessione al server");
    }
  }
}

export async function httpLoader(queryClient) {
  const queryKey = ["products"];
  try {
    return await queryClient.ensureQueryData({
      queryKey,
      queryFn: async () => {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
      },
    });
  } catch (e) {
    const message =
      e.response?.data?.message || e.message || "Errore del server";
    const error = new Error(message);
    error.status = e.response?.status || 500;

    throw error;
  }
}

export async function postOrders(order) {
  try {
    const response = await axios.post(`${API_URL}/orders`, order, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Errore nel server");
    }
    return response.data;
  } catch (e) {
    const message =
      e.response?.data?.message || e.message || "Errore del server";
    const error = new Error(message);
    error.status = e.response?.status || 500;

    throw error;
  }
}

export async function updateUser(userData) {
  try {
    const response = await axios.put(`${API_URL}/users/profile`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Errore nel server");
    }

    return response.data;
  } catch (error) {
    console.error(
      "❌ Errore modifica utente:",
      error.response?.data || error.message,
    );

    // Gestisci gli errori dal backend
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("Errore di connessione al server");
    } else {
      throw new Error("Errore imprevisto durante la modifica");
    }
  }
}

export async function deleteAccount(password) {
  try {
    const response = await axios.delete(`${API_URL}/users/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { password: password },
    });

    return response.data;
  } catch (error) {
    console.error(
      "❌ Errore cancellazione utente:",
      error.response?.data || error.message,
    );

    // Gestisci gli errori dal backend
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("Errore di connessione al server");
    } else {
      throw new Error("Errore imprevisto durante la cancellazione");
    }
  }
}
