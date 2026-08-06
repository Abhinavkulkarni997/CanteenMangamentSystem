import axios from "axios";
import {BASE_URL} from "../constants/config";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
const api=axios.create({
    baseURL:BASE_URL,
    
});

api.interceptors.request.use(async(config)=>{
//       console.log("REQUEST");

//   console.log(config.method);

//   console.log(config.url);

//   console.log(config.headers);

//   console.log(config.data);
    const token=await AsyncStorage.getItem("token");
    if(token){
        config.headers = config.headers ?? {};
config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;