import { CredentialSubmitStatus } from "../types";

export default function validateCredentials(username: string, password: string): CredentialSubmitStatus {
  const minLength = 3;
  const maxLength = 15;
  const validChecking = /^[a-zA-Z0-9]{3,15}$/;

  if (
    username.length < minLength ||
    username.length > maxLength ||
    password.length < minLength ||
    password.length > maxLength
  ) {
    return "length error";
  }

  if (!validChecking.test(username) || !validChecking.test(password)) {
    return "format error";
  }

  return "valid";
}
