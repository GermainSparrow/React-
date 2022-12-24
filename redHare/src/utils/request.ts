import { message } from "antd";
const baseUrl ="http://xawn.f3322.net:8012"
interface Options extends Omit<RequestInit, 'body'> {
    body?: Record<string, any>,
    query?: Record<string, any>,
}
export default function request(url: string, options: Options = {}): Promise<any> {
    const { body, query, ...rest } = options;
    let fetchParams: RequestInit = {
        ...rest
    };
    if (options.body) {
        let body = options.body || {};
        let s = ""
        Object.keys(body).forEach(key => {
            if (body[key] === undefined || body[key] === "") return;
            s += `${key}=${body[key]}&`
        })
        console.log("s----------->",s);
        
        /**
         * 
         * const body  = {
                usernarm:'admin',
                password:'123'
            }
            s = "username=admin&password=123"

         */
        // options.body = s;
        fetchParams.body = s;
        fetchParams.method='post'
    }
    if (options.query) {
        const query = options.query || {};
        let s = ""
        Object.keys(query).forEach(key => {
            if (query[key] === undefined || query[key] === "") return;
            s += `${key}=${query[key]}&`
        })
        url = `${url}?${s}`;
        fetchParams.method='get'
    }
    fetchParams.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authentication": localStorage.getItem('token') as string,
    }
    return fetch(baseUrl + url, fetchParams)
        .then(response => {
            // console.log('response',response)
            switch (response.status) {
                case 200:
                    return response.json();
                case 401:
                    localStorage.clear();
                    window.location.pathname = "/login";
  
                    break;
                case 403:
                    message.error("对不起，您没有权限访问该接口");
                    return Promise.reject("对不起，您没有权限访问该接口");
                default:
                    return Promise.reject(response.json());
            }
        })
        .catch(err => {
            const msg = "Unexpected end of JSON input";
            if (err.message && err.message === msg) {//针对后端接口状态码200，但是没有任何内容返回的时候
                return Promise.resolve();
            }
            if(typeof err.then === 'function'){//如果在上一个then里面走的是default分支，则err是一个promise对象
               return err.then((res:any)=>{//res里面可能包含错误信息，可以用于提示
                    console.log("接口错误：",res);
                    message.error(res.message || "接口未知错误")
                    return Promise.reject(res);
                })
            }
            console.log('接口错误： ', err);
            return Promise.reject(err);
        })
}

// request("//xx",{
//     query:{}
// })


