import { useAppDispatch } from '@/hooks/useAppDispatch'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { selectProductError, selectProductLoading } from "@/features/products/productSlice/products.selectors"
import { addNewProduct } from '@/features/products/productSlice/productsSlice'
import placeholderImage from '@/assets/placeholder.png'

import s from './productForm.module.scss'
import {Button} from "../button/Button"

type AddProductFormProps = {
  onSuccess?: () => void
}

const AddProductForm = ({ onSuccess }: AddProductFormProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectProductLoading)
  const error = useSelector(selectProductError)

  const [form, setForm] = useState({
	title: '',
	price: 1,
	description: '',
	category: '',
	image: '',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
	setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
	e.preventDefault()

	const productData = {
	  ...form,
	  image: form.image || placeholderImage,
	  id: 0,
	}

	const resultAction = await dispatch(addNewProduct(productData))

	if (addNewProduct.fulfilled.match(resultAction)) {
	  alert('Товар добавлен')
	  if (onSuccess) {
		onSuccess()
	  } else {
		navigate('/products')
	  }
	} else {
	  alert('Ошибка при добавлении')
	}
  }

  return (
	<form onSubmit={onSubmit} className={s.productForm}>
	  <div className={s.formRow}><label htmlFor={"title"}>Title</label>
		<input name="title" id="title" placeholder="Название" value={form.title} onChange={onChange} required/>
	  </div>
		<div className={s.formRow}>
		  <label htmlFor={"price"}>Price</label>
		  <input name={'price'} type={'number'} id={"price"} placeholder={"Price"} value={form.price} onChange={onChange} required min={1}/>
		</div>
		<div className={s.formRow}>
		  <label htmlFor={"category"}>Category </label>
		  <select name={"category"} id={'category'} value={form.category} onChange={onChange}>
			<option value="men's clothing">Men's clothing</option>
			<option value="women's clothing">Women's clothing</option>
			<option value="jewelery">Jewelery</option>
			<option value="electronics">Electronics</option>
			<option value="others">Others</option>
		  </select>
		</div>
		<div className={s.formRow}>
		  <label htmlFor={"image"}>Image </label>
		  <input name={"image"} id={'image'} placeholder=" image URL" value={form.image} onChange={onChange}/>
		</div>
		<div className={s.formRow}>
		  <label htmlFor={"description"}>Description </label>
		  <textarea name={"description"} id={"description"}
					placeholder={"description"}
					value={form.description}
					onChange={onChange}
		  />
		</div>

		<Button variant={'secondary'} type="submit" disabled={loading}>Добавить товар</Button>
		{error && <p style={{color: 'red'}}>{error}</p>}
	</form>
)
}

export default AddProductForm
