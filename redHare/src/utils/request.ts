const baseUrl = "http://xawn.f3322.net:8012"
export default {

    post(url: string, data: Object) {
        return fetch(baseUrl + url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                token: localStorage.token
            },
            body: JSON.stringify(data)
        }).then(msg => {
            console.log('mgs', msg);
            return msg.json()
        }).then(
            (response => {
                console.log('response', response);
                return response
            })
        )
    },
    get(url: string, data: Object) {
        return fetch(baseUrl + url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(msg => {
            console.log('mgs', msg);
            return msg.json()
        }).then(
            (response => {
                console.log('response', response);
                return response
            })
        )
    }


}