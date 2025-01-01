export interface Login {
  username: string
  password: string
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface LoginResponse {
  user: User
  tokens: Tokens
}