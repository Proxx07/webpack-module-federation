import {IProduct} from "@packages/shared/src/common";
import classes from "./Product.module.scss";

export const Product = ({product}: {product: IProduct}) => {
  return (

    <div className={classes.product}>
      <div className={classes.name}>
        {product.name}
      </div>

      <div className={classes.description}>
        {product.description}
      </div>
    </div>
  )
}