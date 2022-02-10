import { useState } from "react";
import { useEffect } from "react";
import { STORAGE_KEYS } from "../utils/constants";

export const useAuth = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const userString = localStorage.getItem(STORAGE_KEYS.TOKEN_KEY);
        const user = JSON.parse(userString);
        setUser(user);
    }, [])

    return user
}