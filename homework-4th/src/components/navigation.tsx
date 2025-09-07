import type { ProfilePartial } from '@/libs/supabase'
import NavLink, { type NavigationItem } from './nav-link'

export type Page = 'signin' | 'signup' | 'profile' | 'editProfile'

const PAGES: NavigationItem[] = [
  { path: 'signup', text: '회원가입' },
  { path: 'signin', text: '로그인' },
  { path: 'profile', text: '프로필', authRequired: true },
  { path: 'editProfile', text: '프로필 편집' },
]

interface Props {
  user: ProfilePartial | null
}

export default function Navigation({ user }: Props) {
  return (
    <nav aria-label="메인 내비게이션">
      <ul>
        {PAGES.map((page) => (
          <li key={page.path}>
            <NavLink user={user} item={page} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
