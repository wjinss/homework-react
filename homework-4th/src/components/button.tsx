import React from 'react'

type Button = {
  type: string
  label: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ type, label, ...props }: Button) {
  return (
    <button type={type} {...props}>
      {label}
    </button>
  )
}
