import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useToggleState } from '@/hooks'
import supabase from '@/libs/supabase'
import Input from '../components/input'

interface SignupForm {
  name: string
  email: string
  password: string
  passwordCheck: string
}

export default function SignUpPage() {
  // 폼 상태, 에러, 제출 상태 등 관리
  const {
    register, // <input>에 상태 등록
    handleSubmit, // 제출 이벤트 핸들러
    watch, // 동일성 검증
    formState: { errors, isSubmitting }, // 에러 및 제출 중 상태
    reset, // 폼 초기화 함수
  } = useForm<SignupForm>({ mode: 'onChange' }) // 값 변경 시마다 유효성 검사

  // 비밀번호 보기 토글
  const [showPassword, { toggle: togglePassword }] = useToggleState(false)
  const [showPasswordCheck, { toggle: togglePasswordCheck }] =
    useToggleState(false)

  // 인증 성공 시 이동 페이지 이동
  const [goSignIn, setGoSignIn] = useState(false)
  if (goSignIn) {
    return <Navigate to="/signin" replace />
  }

  // password 동일성 검증을 위해 참조
  const password = watch('password')

  // 폼 제출시 실행되는 비동기 함수
  const onSubmit = async (formData: SignupForm) => {
    // 폼 제출 중에는 실행x
    if (isSubmitting) return

    // supabase 회원가입 api 호출
    const { error, data } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          username: formData.name,
        },
      },
    })

    // api호출 에러 처리
    if (error) {
      toast.error(
        `회원가입 인증에 오류가 발생했습니다! ${error.name} : ${error.message}`
      )
      return
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        username: data.user.user_metadata.username,
        email: data.user.email,
        bio: data.user.user_metadata.bio,
        created_at: new Date().toISOString(),
      })

      if (profileError) {
        toast.error(
          `프로필 테이블 오류 발생! ${profileError.name} : ${profileError.message}`
        )
        return
      }

      toast.success('회원가입에 성공했습니다! 로그인 페이지로 이동합니다.')
      reset()
      setGoSignIn(true)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-xl font-bold mb-6 text-center">회원가입</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-label="회원가입 폼"
        autoComplete="off"
        noValidate
      >
        <Input
          id="signup-name"
          label="이름"
          type="text"
          register={register('name', {
            required: '이름을 입력해주세요!',
          })}
          error={errors.name?.message}
        />

        <Input
          id="signup-email"
          label="이메일"
          type="text"
          register={register('email', {
            required: '이메일을 입력해주세요!',
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
          error={errors.email?.message}
        />
        <Input
          id="signup-password"
          label="비밀번호"
          type="password"
          showToggle
          showPassword={showPassword}
          onTogglePassword={togglePassword}
          register={register('password', {
            required: '패스워드를 입력해주세요!',
            minLength: { value: 8, message: '8자 이상 입력해주세요.' },
          })}
          error={errors.password?.message}
        />
        <Input
          id="signup-password-check"
          label="비밀번호 확인"
          type="password"
          showToggle
          showPassword={showPasswordCheck}
          onTogglePassword={togglePasswordCheck}
          register={register('passwordCheck', {
            required: '비밀번호 확인을 입력해주세요!',
            validate: (value) =>
              value === password || '비밀번호가 일치하지 않습니다.',
          })}
          error={errors.passwordCheck?.message}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          {isSubmitting ? '처리 중...' : '회원가입'}
        </button>
      </form>
    </div>
  )
}
