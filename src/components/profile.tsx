import { useEffect } from "react"
import profile from "@/assets/profile.svg"

export default function Profile(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  useEffect(()=>{
    const session = window.sessionStorage.getItem('session');
    if(!session){
      fetch(`${baseUrl}/auth/session`, {
        method: 'GET',
        credentials: 'include',
      })
      .then(res=>res.json())
      .then(result=>{
        if(result.success){
          window.sessionStorage.setItem('session', JSON.stringify(result.data));
        }});
    }
  },[])
  return(
<button>
          <img src={profile} alt="" />
        </button>

  )
}