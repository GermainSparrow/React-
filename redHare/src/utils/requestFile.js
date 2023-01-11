import { message } from "antd";
const baseUrl ="http://xawn.f3322.net:8012"
let filename = "";
export default function requestFile(url, options = {}){
    const { body, query, ...rest } = options;
    filename = body?.filename;//文件名
    let fetchParams = {
        ...rest
    };

    fetchParams.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authentication": localStorage.getItem('token'),  
    }

    return fetch(baseUrl + url, fetchParams)
        .then(response => {
            console.log('response',response)
            switch (response.status) {
                case 200:
                    return response.blob();
                case 401:
                    localStorage.clear();
                    window.location.pathname = "/login";
                    break;
                default:
                    return Promise.reject(response.blob());
            }
        })
        .then(blob=>{//文件的二进制数据
            console.log('blob', blob)
            // const fileName = Date.now() + ".xlsx"; //我这里给了个时间戳命名,可以根据需求自定义
            //下面就是下载文件的方法了
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            console.log("link.href",link.href)
            link.download = filename  ? filename : Date.now() + ".xlsx" ;//下载文件的文件名
            link.click();
            filename = "";
            window.URL.revokeObjectURL(link.href);

        })
       
}


