
import request from "./request"
interface Options extends Omit<RequestInit, 'body'> {
    body?: Record<string, any>,
    query?: Record<string, any>,
}
export default {
    user: {
        login(body:Options) {
            return request('/login', body)
        }
    }
}