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
const ADDRESS_REGEX = /^[a-zA-ZàáèéìíòóùúÀÁÈÉÌÍÒÓÙÚ0-9\s',./]{2,100}$/ 
const CAP_REGEX = /^\d{5}$/
const PHONE_REGEX = /^[+]?[\d\s\-().]{7,15}$/

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

export function addressReg(address){
  return !!address.match(ADDRESS_REGEX)
}

export function capReg(cap){
  return !!cap.match(CAP_REGEX)
}


export function phoneReg(phone){
  return !!phone.match(PHONE_REGEX)
}