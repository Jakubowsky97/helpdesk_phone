import axios from 'axios';

const base_url = 'https://devhelpdesk.magico.pro';

export const getPairingCode = () => {
  return axios.post(base_url + '/api/v2/phone/pair/generate', {
    "phone_number": "",
    "phone_model": "",
    "phone_device_id": ""
  });
};

export const checkIfPaired = (code, signal) => {
  return axios.get(base_url + '/api/v2/phone/pair/check/' + code, {signal});
};

export const generateOAuthToken = (clientId, clientSecret) => {
  return axios.post(base_url + '/api/v2/phone/oauth/token', {
    "grant_type": "client_credentials",
    "client_id": clientId,
    "client_secret": clientSecret
  });
};

export const getInfoAboutPhone = () => {
    return axios.get(base_url + '/api/v2/phone/me');
};

export const LoginConsultantAPI = () => { 
  return axios.post(base_url + '/api/v2/phone/user/login', {
    "code": document.getElementById('loginCode').value,
  })
};

export const LogOutConsultantAPI = () => { 
  return axios.post(base_url + '/api/v2/phone/user/logout');
};

export const UpdateStatusAPI = (status) => {
  return axios.put(base_url + '/api/v2/phone/status', {
    "phone_status": status,
    "number": document.getElementById('phoneNumber').value || "0",
    "appVersion": "2.0",
    "androidVersion": "",
  }).catch(function (error) {
    console.error(error);
    if(error.response.status == 401) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    }
  });
}

export const SendHistoryAPI = (name, number, callType, date, duration) => {
  return axios.post(base_url + '/api/v2/phone/call', {
    "appVersion": "2.0",
    "data": [
      {
      "cachedName": '',
      "cachedNumberType": 0,
      "contact": 0,
      "date": date,
      "duration": duration,
      "name": name,
      "number": number,
      "phoneAccountId": "string",
      "photo": "string",
      "thumbPhoto": "string",
      "type": callType,
      "viaNumber": "string"
      }
    ]
  }).catch(function (error) {
    console.error(error);
    if(error.response.status == 401) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    }
  });
}