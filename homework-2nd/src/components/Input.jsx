import { useState } from "react"
import Button from "./Button"
import showPassword from '../images/showPassword.svg'

export default function Input({ type, id, placeholder, label, className }) { 
  const [isPasswordHide, setIsPasswordHide] = useState(true)
  const [inputType, setInputType] = useState('password')

  const handleshowPassword = () => {
    setIsPasswordHide(!isPasswordHide)
    isPasswordHide  ? setInputType('text') : setInputType('password') 
  }

  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input type={inputType} id={id} name={id} placeholder={placeholder} />
      {type === 'password' && <Button type={"button"} ariaLabel={inputType === 'password' ? "비밀번호 보기" : "비밀번호 숨기기" } onClick={handleshowPassword} ><img src={showPassword} alt="" role="none" /></ Button >}
    </div>
  )
}