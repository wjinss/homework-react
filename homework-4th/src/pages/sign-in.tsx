import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useToggleState } from '@/hooks'
import supabase from '@/libs/supabase'
import Button from '../components/button'
import Input from '../components/input'

interface LoginForm {
  email: string
  password: string
}

export default function SignInPage() {
  // 폼 상태, 에러, 제출 상태 등 관리
  const {
    register, // <input>에 상태 등록
    handleSubmit, // 제출 이벤트 핸들러
    formState: { errors, isSubmitting }, // 에러 및 제출 중 상태
    reset, // 폼 초기화 함수
  } = useForm<LoginForm>({
    mode: 'onChange', // 값 변경 시마다 유효성 검사
  })

  // 비밀번호 보기 토글
  const [togglePassword, { toggle }] = useToggleState(false)

  // 인증 성공 시 이동 페이지 이동
  const [goProfile, setGoProfile] = useState(false)
  if (goProfile) {
    return <Navigate to="/profile" replace />
  }

  // 폼 제출시 실행되는 비동기 함수
  const onSubmit = async (formData: LoginForm) => {
    // 폼 제출 중에는 실행x
    if (isSubmitting) return

    // supabase 로그인 api 호출
    const { error, data } = await supabase.auth.signInWithPassword(formData)

    // api호출 에러 처리
    if (error) {
      toast.error(
        `로그인 오류가 발생했습니다. ${error.name} : ${error.message} `
      )
    } else {
      if (data.user) {
        const { username } = data.user.user_metadata

        toast.success(`${username}님! 안녕하세요.`, {
          action: {
            label: '프로필 페이지로 이동',
            onClick: () => {
              setGoProfile(true)
              reset()
            },
          },
        })
      }
    }
  }
  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-xl font-bold mb-6 text-center">로그인</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-label="로그인 폼"
        autoComplete="off"
        noValidate
      >
        <Input
          id="login-email"
          label="이메일"
          type="text"
          register={register('email', {
            required: '이름이나 이메일을 입력해주세요!',
          })}
          error={errors.email?.message}
        />
        <Input
          id="login-password"
          label="패스워드"
          type="password"
          showToggle
          showPassword={togglePassword}
          onTogglePassword={toggle}
          register={register('password', {
            required: '패스워드를 입력해주세요!',
          })}
          error={errors.password?.message}
        />
        <Button
          type="submit"
          label="로그인하기"
          className="cursor-pointer w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        />
      </form>
    </div>
  )
}
