import { STORAGE_KEYS } from '../utils/constants'

export const useLogout = () => {
    return localStorage.removeItem(STORAGE_KEYS.TOKEN_KEY);
}