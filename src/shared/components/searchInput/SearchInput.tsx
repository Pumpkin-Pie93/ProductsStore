import {type ChangeEvent, FC, InputHTMLAttributes, ReactNode, useState} from 'react'
import clsx from 'clsx'
import s from './searchInput.module.scss'
import {Button} from "../button/Button"

type Props = {
  placeholder?: string
  icon?: ReactNode
  onSearch?: (value: number | null) => void
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export const SearchInput: FC<Props> = (
  {
	placeholder = 'Search...',
	icon,
	onSearch,
	className,
	...rest
  }) => {
  const [value, setValue] = useState('')

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
	const newValue = e.target.value
	setValue(newValue)

	if (newValue === '') {
	  onSearch?.(null)
	}

	rest.onChange?.(e)
  }

  const handleSearch = () => {
	const numericValue = Number(value);
	if (!isNaN(numericValue)) {
	  onSearch?.(numericValue)
	}
  }

  return (
	<div className={clsx(s.wrapper, className)}>
	  {icon && <div className={s.icon}>{icon}</div>}
	  <input
		type="search"
		className={s.input}
		inputMode={'numeric'}
		value={value}
		onChange={handleInputChange}
		placeholder={placeholder}
		{...rest}
	  />
	  <Button variant={'secondary'} onClick={handleSearch}>Search</Button>
	</div>
  )
}
