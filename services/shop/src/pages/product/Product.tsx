import {Product as ShopProduct} from "@/components/Product/Product";
import {product as prodContent} from "@packages/shared/src/common";

const Product = () => {
  return (
    <>
      <h1>Product page</h1>
      <ShopProduct product={prodContent}/>
    </>
  )
}

export default Product;