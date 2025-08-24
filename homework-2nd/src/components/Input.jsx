import { useState } from "react"
import Button from "./Button"
import showPassword from '../images/showPassword.svg'

export default function Input({ type, id, placeholder, label }) { 
  const [isPasswordHide, setIsPasswordHide] = useState(true)
  const [inputType, setInputType] = useState('password')

  const handleshowPassword = () => {
    setIsPasswordHide(!isPasswordHide)
    !isPasswordHide ? setInputType('password') : setInputType('number') 
  }

  
  
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type={inputType} id={id} name={id} placeholder={placeholder} />
      {type === 'password' && <Button type={"button"} onClick={handleshowPassword} ><img src={showPassword} alt="" /></ Button >}
    </>
  )
}