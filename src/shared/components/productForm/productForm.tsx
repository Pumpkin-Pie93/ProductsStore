import { useAppDispatch } from '@/hooks/useAppDispatch'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { selectProductError, selectProductLoading } from "@/features/products/productSlice/products.selectors"
import { addNewProduct } from '@/features/products/productSlice/productsSlice'
import s from './productForm.module.scss'

type AddProductFormProps = {
  onSuccess?: () => void
}

const AddProductForm = ({ onSuccess }: AddProductFormProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectProductLoading)
  const error = useSelector(selectProductError)

  // const [form, setForm] = useState({
	// title: '',
	// price: '',
	// description: '',
	// category: '',
	// image: '',
  // })
  const [form, setForm] = useState({
	title: 'Women Bag',
	price: '75',
	description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.',
	category: 'women\'s clothing',
	image: 'https://i.pinimg.com/736x/53/56/bf/5356bfbdee7ab2bb0dd2076bb5a408d8.jpg',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
	setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
	e.preventDefault()

	// Проверяем, что цена — число
	const priceNum = Number(form.price)
	if (isNaN(priceNum)) {
	  alert('Цена должна быть числом')
	  return
	}

	const productData = {
	  ...form,
	  price: priceNum,
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

		<button type="submit" disabled={loading}>Добавить товар</button>
		{error && <p style={{color: 'red'}}>{error}</p>}
	</form>
)
}

export default AddProductForm
