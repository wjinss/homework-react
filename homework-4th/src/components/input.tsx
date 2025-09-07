import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

type Props = {
  id: string
  label: string
  register?: UseFormRegisterReturn
  error?: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  showToggle?: boolean
  showPassword?: boolean
  onTogglePassword?: () => void
  describedById?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'>

export default function Input({
  id,
  label,
  register,
  error,
  type = 'text',
  showToggle = false,
  showPassword,
  onTogglePassword,
  describedById,
  className = '',
  ...props
}: Props) {
  const isPasswordField = type === 'password'
  const withToggle = isPasswordField && showToggle

  const computedType =
    withToggle && typeof showPassword === 'boolean'
      ? showPassword
        ? 'text'
        : 'password'
      : type

  const errorId = describedById ?? `${id}-error`

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium mb-1">
        {label}
      </label>

      <div className={`relative ${withToggle ? 'pr-10' : ''}`}>
        <input
          id={id}
          type={computedType}
          {...register}
          {...props}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : props['aria-describedby']}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
            error
              ? 'border-red-500 ring-red-300'
              : 'border-gray-300 focus:ring-blue-300'
          } ${className}`}
          autoComplete={
            props.autoComplete ?? (isPasswordField ? 'current-password' : 'off')
          }
        />

        {withToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className=" cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition focus:outline-none focus:ring focus:ring-blue-300"
            aria-label={showPassword ? '패스워드 숨기기' : '패스워드 표시'}
            title={showPassword ? '패스워드 숨기기' : '패스워드 표시'}
            disabled={!onTogglePassword} // 핸들러 없으면 비활성화
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        )}
      </div>

      {error && (
        <div id={errorId} className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
