import s from './button.module.scss'
import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'

type ButtonProps = {
  children: ReactNode
  name?: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
} & ComponentProps<'button'>

export const Button = (
  {
    children, onClick, name, className, variant = 'primary', ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(s.button, s[variant], className)}
      onClick={onClick}
      name={name}
    >
      {children}
    </button>
  )
}
