import { APIURL } from "./SysConfs";
// Login
export const LoginAPI = APIURL + "account/login";
export const ResetAPI = APIURL + "account/reset";
export const GetSOCAPI = APIURL + "employee/generalinfo/ref";
export const FCMAPI = APIURL + "employee/token/add";
export const FCMAPID = APIURL + "employee/token/remove";

// Admin
export const AdminInfoApi = APIURL + "admin/show";
export const AdminListerApi = APIURL + "admin/list";
export const AdminGetAPI = APIURL + "admin/show";
export const AdminEditAPI = APIURL + "admin/update";
export const AdminDeleteAPI = APIURL + "admin/delete";
export const AdminAccountAPI = APIURL + "admin/logininfo";
export const AdminAddAPI = APIURL + "admin/new";

// IOM HR
export const IOMHRListerAPI = APIURL + "hr/list";
export const IOMHRAddAPI = APIURL + "hr/new";
export const IOMHRGetAPI = APIURL + "hr/show";
export const IOMHRDeleteAPI = APIURL + "hr/delete";
export const IOMHREditAPI = APIURL + "hr/update";
export const IOMHRAccountAPI = APIURL + "hr/loginifo";
