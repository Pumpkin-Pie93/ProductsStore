import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu"
import type {ReactNode} from "react"

import s from './dropdown.module.scss'

type DropdownProps = {
  children?: ReactNode
}

export const Dropdown = (props:DropdownProps) => {
 const {children} = props

  return (
	  <DropdownMenu>{children}</DropdownMenu>
  )
}

type DropdownTriggerProps = {
  children: ReactNode
}
export const DropdownTrigger = (props:DropdownTriggerProps)=> {
  const {children} = props
  return (
	<DropdownMenuTrigger asChild className={s.dropdownTrigger}>
	  {children}
	</DropdownMenuTrigger>
  )
}
type DropdownContentProps = {
  children: ReactNode
}
export const DropdownContent =  (props:DropdownContentProps)=> {
  const {children} = props
  return (
	<DropdownMenuPortal>
	  <DropdownMenuContent className={s.dropdownMenuContent}>
		{children}
	  </DropdownMenuContent>
	</DropdownMenuPortal>
  )
}