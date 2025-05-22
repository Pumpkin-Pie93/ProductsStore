import { useAppDispatch } from '@/hooks/useAppDispatch'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { selectProductError, selectProductLoading } from "@/features/products/productSlice/products.selectors"
import s from '../productForm/productForm.module.scss'
import type {Product} from "../../../features/products/types/productsApi.types.ts"
import {updateProduct} from "../../../features/products/productSlice/productsSlice"
import placeholderImage from '@/assets/placeholder.png'
import {Button} from "../button/Button"

type AddProductFormProps = {
  onSuccess?: () => void
  prevProductInfo:Product
}

const UpdateProductForm = ({ onSuccess, prevProductInfo }: AddProductFormProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectProductLoading)
  const error = useSelector(selectProductError)

  const [form, setForm] = useState({
	title: prevProductInfo.title,
	price: prevProductInfo.price,
	description: prevProductInfo.description,
	category: prevProductInfo.category,
	image: prevProductInfo.image,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
	setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
	e.preventDefault()

	const priceNum = Number(form.price)
	if (isNaN(priceNum)) {
	  alert('Цена должна быть числом')
	  return
	}

	const productData = {
	  ...form,
	  price: priceNum,
	  image: prevProductInfo.image || placeholderImage,
	  id: prevProductInfo.id,
	}

	const resultAction = await dispatch(updateProduct(productData))

	if (updateProduct.fulfilled.match(resultAction)) {
	  alert('Товар обновлен')
	  if (onSuccess) {
		onSuccess()
	  } else {
		navigate('/products')
	  }
	} else {
	  alert('Ошибка при обновлении товара')
	}
  }

  return (
	<form onSubmit={onSubmit} className={s.productForm}>
	  <div className={s.formRow}><label htmlFor={"title"}>Title</label>
		<input name="title" id="title" placeholder="Название" value={form.title} onChange={onChange}/>
	  </div>
	  <div className={s.formRow}>
		<label htmlFor={"price"}>Price</label>
		<input name={'price'} id={"price"} placeholder={"Price"} value={form.price} onChange={onChange}/>
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

	  <Button variant={'secondary'} type="submit" disabled={loading}>Обновить товар</Button>
	  {error && <p style={{color: 'red'}}>{error}</p>}
	</form>
  )
}

export default UpdateProductForm
