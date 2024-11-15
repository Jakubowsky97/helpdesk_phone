import { LogOutConsultantAPI } from "@/api/apiServices";

export const handleClearLocalStorage = () => { 
  localStorage.removeItem('accessToken');
  localStorage.removeItem('clientId');
  localStorage.removeItem('clientSecret');
  localStorage.removeItem('userId');
  localStorage.removeItem('name');
}

export const logOutConsultant = () => {
  LogOutConsultantAPI().catch(function (error) {
    console.error(error);
  });
  localStorage.removeItem('name');
  localStorage.removeItem('userId');
  localStorage.removeItem('status');
}