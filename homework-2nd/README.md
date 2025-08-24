# 리액트 2주차 과제

## statefull 컴포넌트 구현 및 상태 끌어올리기

결과물
![](https://velog.velcdn.com/images/wjinss/post/497d15a0-248f-4d2f-aa00-67135efa27c5/image.png)

### [2주차 과제 배포](https://wjinss-react-homework2.netlify.app/)

### 컴포넌트

#### SignUpForm.jsx

- signIn.json에서 데이터를 불러와 컴포넌트에 값을 할당
- useState를 사용해서 폼에 입력된 값과 정규표현식에 맞지 않는 에러를 상태로 저장,
- onChange로 input에 입력되는 값을 정규표현식으로 검사 후 formData와 formErrors 상태 업데이트
- signIn.json에 저장된 값을 토대로 `<Input/>` 컴포넌트 리스트 렌더링 및 value, onChange, errorMessage는 상태에서 값을 할당
- 리팩토링시 상태와 이벤트 핸들러를 utils로 분류 후 SignUpForm, SignInForm 컴포넌트에서 재사용 할 수 있도록 만들어 볼 예정

```jsx
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import SIGNUP_DATA from "../data/signIn.json"

export default function SignUpForm({ formClassName, formButtonClassName}) { 
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
    <form className={formClassName}>
      {SIGNUP_DATA.map(item => (
        <Input {...item}
          key={item.id}
          value={formData[item.id]}
          onChange={(e) => handleChangeValue(item.id, item.type, e.target.value)}
          errorMessage={formErrors[item.id]}
        />
      ))}

      <Button type={'submit'} className={formButtonClassName}>회원가입</Button>
    </form>
  )
}


```

#### Input.jsx

- 비밀번호 보기 버튼과 인풋의 타입을 상태를 지정
- handleshowPassword 이벤트 핸들러로 클릭 시 버튼의 타입이 토글되게 함수 지정
- input의 타입이 'password'일 경우 `<Button />` 컴포넌트 조건부 렌더링, 저장된 상태에 따라 타입이 변경(토글)
- props로 전달받은 errorMessage 상태가 있으면 에러메세지를 보여주는 `<p>`요소 조건부 렌더링
- 리팩토링시 Input을 더 잘게 쪼개고, 현 컴포넌트는 molecule 단위로 다시 만들어 볼 예정

```jsx
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
```

#### Button.jsx

- 상위 컴포넌트에서 props로 받아 값을 할당

```jsx
export default function Button({type, className, children, onClick, ariaLabel}) { 
  return <button type={type} className={className} aria-label={ariaLabel} onClick={onClick}>{children}</button>
}
```

## 회고

이번주는 짧게 3일만 수업을 진행하다 보니, 배운 내용이 그리 많지는 않았다. 
그래도 리액트에서 중요한 "상태가 있는 컴포넌트"를 배우게 됐고, 확실히 다시금 배우니깐 이해가 더 잘되는 느낌이다. 
그래도 "Lifting state up", useImmer 등등 낯선 내용도 있다보니 복습을 계속해서 하면서 손에 익히고 있다. 
다만, 문제는 함수형 컴포넌트는 익숙해서 괜찮지만 class형 컴포넌트는 처음 배우고 class 문법에 대한 숙련도가 부족하다 보니 아직은 낯설고 손이 안간다. 
수업시간에 끙끙거리며 class형 컴포넌트를 만들어 보려고 했지만, 매번 시간 부족으로 인해 완성을 하지 못하고 있다. 
아직 예습도 다 하지 못했는데 복습에서 턱 막히니 마음이 살짝 조급해진다. 
부트캠프는 어느듯 2달 가량 남았는데 아직도 코드를 작성할때 멈칫하고 실습 시간에 코드고 빈번히 다 작성하지 못하고 있다. 
확실히 연습이 더 필요한 것 같다.. 다음주엔 TS도 병행하면서 수업을 진행하는데 살짝 막막한 기분이 든다. 
과제를 하면서 진행한 테일윈드도 아직은 낯선데 여기에 TS까지 추가되면 수업을 잘 따라갈수 있을까 하는 의문이 든다. 
그래도 어쩌겠나. 못따라갔으면 수업 끝나고 복습하면서 따라가야지. 막막한 감정은 시작을 안해서 느껴지는 감정이라고 생각한다.
막상 시작하면 어떻게든 해낼 것을 알기에 최대한 불안함 감정은 뒤로 미뤄두고 내 앞에 놓인 것들을 차근차근 해보자. 

KBS TV프로그램 "다큐 3일"에 이런 말이 나온다.
> 나는 그대로 있고 자꾸 (다른 것들이)높아져 보이는데.. 그러니 자꾸 초라해 보인다. 
> 위에서 올라와 보면 아무것도 아닌데 밑에서 보면 꼭 못 올라 갈 것 같아.

지금 나한테는 JS, TS, React, NEXT 등등 프론트엔드의 기술이 아직은 어렵고 버겁다. 
하지만 누가 처음부터 이러한 기술들을 잘 다뤘을까. 다들 연습하고 많이 경험하면서 실력이 는 것이라 생각한다. 
꾸준히 연습하고 실력이 늘면 지금 초보 시절의 고민과 걱정은 대수롭지 않았던 것이라고 생각할 것이다. 
고민은 걱정을 낳고, 걱정은 두려움을 낳는다고 생각한다. 두려워하지말고 어려워도 일단 한 줄의 코드라도 작성해보자. 
남은 기간도 열심히 해보자!