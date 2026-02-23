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

const TEXT_REGEX= /^[a-zA-ZàáèéìíòóùúÀÁÈÉÌÍÒÓÙÚ\s']{2,50}$/
const USERNAME_REGEX= /^[a-zA-Z0-9_]{3,16}$/;
const EMAIL_REGEX= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export function textReg(text){
  return !!text.match(TEXT_REGEX)
}

export function emailReg(email){
  return !!email.match(EMAIL_REGEX)
}

export function usernameReg(username){
  return !!username.match(USERNAME_REGEX)
}


export function passwordReg(password){
  return !!password.match(PASSWORD_REGEX)
}