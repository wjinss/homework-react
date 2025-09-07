import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { JSX } from 'react/jsx-runtime'
import { toast } from 'sonner'
import Navigation, { type Page } from './components/navigation'
// import usePageQuery from './hooks/use-query'
import supabase, { type ProfilePartial } from './libs/supabase'
import EditProfilePage from './pages/editProfile'
import ProfilePage from './pages/profile'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'

const getUser = async (user: User) => {
  return supabase
    .from('profiles')
    .select('username, email, bio')
    .eq('id', user.id)
    .single()
}

export default function AppPage() {
  // const page = usePageQuery<Page>('signup') // page값 읽어오기
  const [user, setUser] = useState<ProfilePartial | null>(null) // 사용자 상태 : 프로필 정보 or null

  useEffect(() => {
    // 최초 마운트 시, Supabase에서 현재 사용자 정보 가져오기
    supabase.auth.getUser().then(async ({ error, data }) => {
      if (!error) {
        // 인증 정보가 있으면 사용자 데이터 가져오기
        const { error: userProfileError, data: userProfile } = await getUser(
          data.user
        )

        if (userProfileError) {
          // 프로필 데이터를 못가져올 경우 에러
          toast.error(
            `프로필 데이터 가져오기 오류 발생! ${userProfileError.message}`
          )
        } else {
          // 프로필 데이터를 가져올 경우 user 상태 업데이트
          setUser(userProfile)
        }
      }
    })

    // supabase 인증 상태 변경 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      switch (event) {
        case 'SIGNED_IN': {
          // 로그인 성공하면 세션에서 user 가져오기
          const user = session?.user
          if (user) {
            // 해당 user의 profiles 정보 가져오기
            const { data } = await getUser(user)
            setUser(data)
          }
          break
        }
        case 'SIGNED_OUT':
          // 로그아웃하면 user의 상태를 null로 변경
          setUser(null)
          break
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const location = useLocation()
  const path = location.pathname
  let renderPage: JSX.Element | null = null

  // 현재 페이지 값에 따라 동적 렌더링
  switch (path) {
    case '/signin':
      renderPage = <SignInPage />
      break
    case '/signup':
      renderPage = <SignUpPage />
      break
    case '/profile':
      renderPage = <ProfilePage user={user} />
      break
    case '/editProfile':
      renderPage = <EditProfilePage user={user} />
      break
  }

  return (
    <div>
      <header>
        <h1>4주차 과제</h1>
      </header>
      <Navigation user={user} />
      <main>{renderPage}</main>
    </div>
  )
}
