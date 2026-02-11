export function authCheck() {
  const expires = localStorage.getItem("expires");
  const token = localStorage.getItem("token");
  const expirationTime = expires ? Number(expires) : 0;
  const now = Number(Date.now());
  if (!token || !expirationTime) {
    throw new Response(
      JSON.stringify({
        message: "Sessione scaduta. Effettua nuovamente il login.",
      }),
      {
        status: 401,
      },
    );
  }

  if (token && expirationTime < now) {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    localStorage.removeItem("username");
    throw new Response(
    JSON.stringify({ message: "Sessione scaduta. Effettua nuovamente il login." }), // Argomento 1: Body
    { 
      status: 401, 
      headers: { "Content-Type": "application/json" } 
    })
  }
  return token;
}
