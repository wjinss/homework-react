import { useState } from "react"
import Button from "./Button"
import showPassword from '../images/showPassword.svg'

export default function Input({ type, id, placeholder, label, className, value, onChange, errorMessage }) { 
  const [isPasswordHide, setIsPasswordHide] = useState(true)
  const [inputType, setInputType] = useState('password')

  const handleshowPassword = () => {
    setIsPasswordHide(!isPasswordHide)
    isPasswordHide ? setInputType('text') : setInputType('password') 
  }

  return (
    <div className='relative flex flex-row flex-wrap justify-between items-center'>
      <label htmlFor={id} className="w-full text-[#26262C] font-semibold leading-[20px]">{label}</label>
      <input
        type={type !== 'password' ? type : inputType}
        id={id} name={id} placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pt-2 pb-3 border-b border-b-neutral-200 opacity-50 placeholder:text-sm"
      />
      {type === 'password' &&
        <Button
          type={"button"}
          ariaLabel={inputType === 'password' ? "비밀번호 보기" : "비밀번호 숨기기"}
          onClick={handleshowPassword}
          className="cursor-pointer absolute top-1/2 right-0 w-5 h-5"
        >
          <img
            src={showPassword}
            alt=""
            role="none"
          />
        </ Button >}
      {errorMessage && <p className="absolute bottom-0 translate-y-full text-red-600 text-xs">{errorMessage}</p>}
    </div>
  )
}