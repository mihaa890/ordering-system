import jwt from 'jwt-decode'

const useTokenValidator = (token) => {
    try {
        let decodedToken = jwt(token, { complete: true })
        let tokenDateExpired = new Date(decodedToken.exp * 1000)
        let dateNow = new Date();

        return tokenDateExpired > dateNow

    }
    catch {
        return false
    }
}


export default useTokenValidator;