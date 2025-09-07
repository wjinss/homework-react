import React from 'react'

type Input = {
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ label, ...props }: Input) {
  return (
    <>
      <label htmlFor="">{label}</label>
      <input {...props} />
    </>
  )
}
