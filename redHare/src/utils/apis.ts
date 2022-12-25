
import request from "./request"
interface Options extends Omit<RequestInit, 'body'> {
    body?: Record<string, any>,
    query?: Record<string, any>,
}
export default {
    user: {
        login(body: Options) {
            return request('/login', body)
        }
    },
    menu: {
        getMenu(query: Options) {
            let temp = JSON.parse(localStorage.user);

            return request(`/menu/${temp.username}`, query)
        }
    }
}