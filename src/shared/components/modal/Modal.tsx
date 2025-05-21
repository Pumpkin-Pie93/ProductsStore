import { ReactNode, useEffect } from "react"
import s from "./Modal.module.scss"

interface ModalProps {
  onClose: () => void
  children: ReactNode
}

const Modal = ({ onClose, children }: ModalProps) => {
  useEffect(() => {
	const onKeyDown = (e: KeyboardEvent) => {
	  if (e.key === "Escape") onClose()
	}
	window.addEventListener("keydown", onKeyDown)
	return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  return (
	<div className={s.backdrop} onClick={onClose}>
	  <div className={s.modal} onClick={e => e.stopPropagation()}>
		<button className={s.closeBtn} onClick={onClose}>×</button>
		{children}
	  </div>
	</div>
  )
}

export default Modal
