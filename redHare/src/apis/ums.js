import request from "../utils/request";
import requestFile from "../utils/requestFile";
//登录
export const loginApi=body=>request('/login',{method:'POST',body});
//获取菜单数据
export const sideMenusApi=()=>request('/menu');
//修改个人数据
export const updateProfile=(body)=>request('/user/profile',{method:'PUT',body});
//获取个人数据
export const mrbird=()=>request('/user/mrbird');
//修改个人头像
export const avatar=(body)=>request('/user/avatar',{method:'PUT',body});
//获取个人密码
export const getPassword=(body)=>request('/user/password/check?'+body);
//修改个人密码
export const password=(body)=>request('/user/password',{method:'PUT',body});
//用户管理
export const userList=(body)=>request('/user?'+body);
export const addUser=(body)=>request('/user',{method:'POST',body});
export const delUser=(body)=>request('/user/'+body,{method:'DELETE'});
export const updateUser=(body)=>request('/user',{method:'PUT',body});
//密码重置
export const reset=(body)=>request('/user/password/reset',{method:'PUT',body});
//导出Excel
export const excel=()=>requestFile('/user/excel',{method:'POST',body:{filename:'userDataFile'}});
//获取首页图表数据
export const getChart=()=>request('/index/mrbird');
//角色管理
export const roleList=(body)=>request('/role?'+body);
export const addRole=(body)=>request('/role',{method:'POST',body});
export const delRole=(body)=>request('/role/'+body,{method:'DELETE'});
export const updateRole=(body)=>request('/role',{method:'PUT',body});