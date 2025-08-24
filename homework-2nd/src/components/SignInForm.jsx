import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import SIGNUP_DATA from "../data/signUp.json"
import './signin.css'

export default function SignInForm() { 
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [formErrors, setFormErrors] = useState({
    signUpName: "",
    email: "",
    password: "",
    confirmPassword: ""
});

  const handleChangeValue = (id, type, value) => {
    let errorMessage = ''
    const regName = /^(?=.*[가-힣])[가-힣]{2,}$/
    const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    const regPW = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

    if (type === 'text' && !regName.test(value)) {
      errorMessage='이름을 2글자 이상 입력해주세요'
    }else if (type === 'email' && !regEmail.test(value)) {
      errorMessage='이메일 양식에 맞게 입력해주세요'
    }else if (type === 'password' && !regPW.test(value)) {
      errorMessage = '숫자, 영문 조합 6자리 이상 입력해주세요'
    }

    setFormData({ ...formData, [type]: value });
    setFormErrors({ ...formData, [id]: errorMessage })
  }


  return (
    <form className="sign-in-form">
      {SIGNUP_DATA.map(item => (
        <Input {...item}
          key={item.id}
          value={formData[item.id]}
          onChange={(e) => handleChangeValue(item.id, item.type, e.target.value)}
          errorMessage={formErrors[item.id]}
        />
      ))}
      <Button type={'submit'} className={'signUpButton'}>회원가입</Button>

    </form>
  )
}