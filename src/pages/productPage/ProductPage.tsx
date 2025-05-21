// import Product from "@/features/products/ui/Product"

export const ProductPage = (params:{id:number}) => {
  const {id} = params
  return (
	<div>
	  <h1>{id}</h1>
	  {/*<Product />*/}
	</div>
  )
}