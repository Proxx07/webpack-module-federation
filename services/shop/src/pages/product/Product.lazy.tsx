import {lazy} from "react";

const ProductLazy = lazy(() => import("./Product"))
export default ProductLazy;