import Input from "./Input";
import Button from "./Button";
import SIGNUP_DATA from "../data/data.json"
import './signin.css'

export default function SignUpForm() { 
  return (
    <form className="sign-in-form">
      {SIGNUP_DATA.map(item => (
        <Input {...item} key={item.id} />
      )) }
      <Button type={'button'} className={'signUpButton'}>회원가입</Button>

    </form>
  )
}