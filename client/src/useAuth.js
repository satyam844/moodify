import { useEffect, useState } from "react";
import React  from 'react';
import axios from "axios";


function useAuth(code) {
  
 const [accessToken,setAccessToken] = useState();   
 const [refreshToken,setRefreshToken] = useState();
 const [expiresIn,setExpiresIn] = useState();
  useEffect(() => {
     axios.post("http://localhost:3001/login",{
         code,
     }).then(res => {
         setAccessToken(res.data.accessToken);
         setRefreshToken(res.data.refreshToken);
         setExpiresIn(res.data.expiresIn);
         window.history.pushState({},null,"/");
     }).catch(() =>{
         window.location = "/"
     })
  },[code])

useEffect(() => {
    if(!refreshToken || !expiresIn) return 
    const timeout = setTimeout(() => {
        
    
    axios.post("http://localhost:3001/refreshToken",{
        refreshToken,
    }).then(res => {
     setAccessToken(res.data.accessToken);
     setExpiresIn(res.data.expiresIn);
    }).catch(() =>{
        window.location = "/"
    })
}, (expiresIn -60) * 1000 )
return () => clearTimeout(timeout)
},[refreshToken,expiresIn])

  return accessToken;

  }

export default useAuth;
