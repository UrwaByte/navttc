import type { FormEvent } from "react"
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();
  const handleSumbit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    // somehow grab the data
    const formData = new FormData(e.currentTarget);
    fetch(`${baseUrl}/auth/signup`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
      })
    }).then((res)=>res.json()).then(res=>{
      if(res.success){
        navigate("/login");
      }
      else{
        alert(res.error);
      }
    })
  }
  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-[url(./assets/signup-bg.png)] bg-no-repeat bg-contain">
        <div className="w-full pt-8 max-w-2xl bg-white border flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">SignUp to Shop.co</h1>
            <p className="text-gray-500 mt-1">Quick and Easy way to get started on shopping </p>
            <form onSubmit={handleSumbit} className="w-[90%] sm:w-[85%] md:w-[75%] mx-auto mt-8 pb-8 text-gray-600">
              <div className="px-4 py-4 flex flex-col gap-2 border-2 border-gray-200 focus-within:border-gray-400">
                <label htmlFor="fullName" className="uppercase">Full Name</label>
                <input id="fullName" name="fullName" className="outline-none" placeholder="Name..."/>
              </div>

              <div className="px-4 py-4 flex flex-col gap-2 border-2 border-gray-200 focus-within:border-gray-400">
                <label htmlFor="email" className="uppercase">Email Address</label>
                <input id="email" name="email" type="email" className="outline-none" placeholder="Email..."/>
              </div>

              <div className="px-4 py-4 flex flex-col gap-2 border-2 border-gray-200 focus-within:border-gray-400">
                <label htmlFor="password" className="uppercase">Password</label>
                <input id="password" name="password" type="password" className="outline-none" placeholder="Password..."/>
              </div>

              <div className="flex items-center gap-4 my-6">
                <input id="terms" type="checkbox" className="size-6 rounded-none border checked:bg-red-500 border-t-gray-400 border-s-gray-400 border-e-gray-900 border-b-gray-900  appearance-none" />
                <label htmlFor="terms">I Agree to Terms of Service and Privacy Policy</label>
              </div>

              <div>
                <button type="submit" className="cursor-pointer uppercase text-lg text-white bg-[#212121] w-full py-4">Create an account</button>
              </div>
            </form>
        </div>
    </div>
  )
}