import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import type { ProfilePartial } from '@/libs/supabase'
import { Page } from './navigation'

export interface NavigationItem {
  path: Page
  text: string
  authRequired?: boolean
}

interface Props {
  user: ProfilePartial | null
  item: NavigationItem
}

export default function NavLink({ user, item }: Props) {
  const { path, text, authRequired } = item

  return (
    <Link
      to={path} // 페이지 연결
      onClick={(e) => {
        // 인증, 유저 객체 있을때만 페이지 이동
        if (authRequired && !user) {
          e.preventDefault()
        }
      }}
      aria-disabled={authRequired ? !user : undefined}
    >
      {text}
    </Link>
  )
}
