
import request from "./request"
export default {
    user: {
        login(body: { username: string, password: string }) {
            return request.post('/login', body)
        }
    }
}