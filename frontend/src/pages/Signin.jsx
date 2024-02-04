import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/Subheading"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signin = () => {
  const [signInObj, setSignInObj] = useState({});
  const navigate = useNavigate();

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={handleOnchange} placeholder="arjun@gmail.com" name={"username"} label={"Username"} />
        <InputBox onChange={handleOnchange} placeholder="123456" label={"Password"} name={"password"} type={'password'} />
        <div className="pt-4">
          <Button onClick={handleSubmit} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>


  function handleOnchange(e) {
    setSignInObj({
      ...signInObj,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    try {
      let response = await axios.post('http://localhost:3000/api/v1/user/signin', signInObj);
      localStorage.setItem('token', response.data.token);
      setSignInObj({});
      navigate('/dashboard')


    } catch (error) {
      console.log(error)
    }
  }
}