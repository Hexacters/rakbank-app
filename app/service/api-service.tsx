const baseAPI = "http://localhost:8080"

const API = {
    USERS: (id?: any) => {
        if (id) {
            return `${baseAPI}/users/${id}`
        }
        return `${baseAPI}/users`
    }
}

export {
    baseAPI,
    API
}