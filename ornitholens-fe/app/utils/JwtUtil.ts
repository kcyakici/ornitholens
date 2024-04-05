export function decodeJwtPayload(jwt: string) {
  const payload = JSON.parse(atob(jwt.split(".")[1]));
  //   console.log(`Payload of JWT: ${payload}`);
  return payload;
}

export function isTokenExpired(jwt: string) {
  const payload = decodeJwtPayload(jwt);
  const currentTimeMilliseconds = new Date().getTime() / 1000;
  //   console.log(`Current time in milliseconds: ${currentTimeMilliseconds}`);
  //   console.log(`JWT expiration: ${payload?.exp}`);
  //   console.log(`Subject: ${extractSubject(jwt)}`);
  return Math.floor(currentTimeMilliseconds) >= payload?.exp;
}

export function extractJwtSubject(jwt: string) {
  const payload = decodeJwtPayload(jwt);
  return payload?.sub;
}
