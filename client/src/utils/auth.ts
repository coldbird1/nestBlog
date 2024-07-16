import ls from '@/utils/webStorge'

const TokenKey = 'Admin-Token'

export function getToken() {
  return ls.get(TokenKey)
}

export function setToken(token: string) {
  return ls.set(TokenKey, token)
}

export function removeToken() {
  return ls.remove(TokenKey)
}
