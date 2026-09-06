export interface LoginCredentialsDTO {
  login: string;
  password: string;
  token?: string;
}

export interface TokenDTO {
  id: number;
  user_id: number;
  hash: string;
  token?: string
}

export class AuthenticationException extends Error {
  constructor(
    msg: string = "Authentication has failed."
  ) {
    super(msg);

    Object.setPrototypeOf(this, AuthenticationException.prototype);
  }
}

export class AuthenticationHttpException extends AuthenticationException {
  constructor(
    public readonly response: Response,
    msg: string = "The authentication request has failed."
  ) {
    super(msg);

    Object.setPrototypeOf(this, AuthenticationHttpException.prototype);
  }
}

export class AuthenticationInvalidCredentialsException extends AuthenticationHttpException {
  constructor(
    public readonly response: Response,
    msg: string = "Invalid credentials."
  ) {
    super(response, msg);

    Object.setPrototypeOf(this, AuthenticationInvalidCredentialsException.prototype);
  }
}

export class AuthenticationFlaggedAsRobotException extends AuthenticationHttpException {
  constructor(
    public readonly response: Response,
    msg: string = "The parser is flagged as a robot."
  ) {
    super(response, msg);

    Object.setPrototypeOf(this, AuthenticationFlaggedAsRobotException.prototype);
  }
}

export async function login(credentials: LoginCredentialsDTO): Promise<TokenDTO> {
  const BASE_URL = import.meta.env.VITE_ARANEAE_BASE_URL;
  const LOGIN_PATH = import.meta.env.VITE_ARANEAE_LOGIN_PATH;

  const request = new Request(`${BASE_URL}${LOGIN_PATH}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  const response = await fetch(request);

  if (!response.ok) {
    if (response.status === 404) throw new AuthenticationInvalidCredentialsException(response);
    if (response.status === 409) throw new AuthenticationFlaggedAsRobotException(response);

    throw new AuthenticationHttpException(response, await response.text());
  }

  const token = await response.json() as TokenDTO;

  return token;
}

export async function patchToken(token: string, hash: string): Promise<TokenDTO> {
  const BASE_URL = import.meta.env.VITE_ARANEAE_BASE_URL;
  const TOKEN_PATH = import.meta.env.VITE_ARANEAE_TOKEN_PATH;

  const request = new Request(`${BASE_URL}${TOKEN_PATH}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${hash}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  });

  const response = await fetch(request);

  if (!response.ok) throw new AuthenticationHttpException(response, await response.text());

  const dto = await response.json() as TokenDTO;

  return dto;
}

export async function logout(hash: string): Promise<void> {
  const BASE_URL = import.meta.env.VITE_ARANEAE_BASE_URL;
  const LOGOUT_PATH = import.meta.env.VITE_ARANEAE_LOGOUT_PATH;

  const request = new Request(`${BASE_URL}${LOGOUT_PATH}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${hash}`,
    }
  });

  const response = await fetch(request);

  if (!response.ok) throw new AuthenticationHttpException(response, await response.text());

  return;
}
