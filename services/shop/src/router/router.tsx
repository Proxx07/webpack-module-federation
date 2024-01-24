import {createBrowserRouter, RouteObject} from "react-router-dom";
import {App} from "@/App";
import {Suspense} from "react";
import ShopLazy from "@/pages/shop/Shop.lazy";
import ProductLazy from "@/pages/product/Product.lazy";

const routes: RouteObject[] = [
  {
    path: '/shop',
    element: <App/>,
    children: [
      {
        path: '/shop/categories',
        element: <Suspense fallback='Loading...'> <ShopLazy/> </Suspense>
      },

      {
        path: '/shop/product',
        element: <Suspense fallback='Loading product ...'> <ProductLazy/> </Suspense>
      }
    ]
  },
];

export const router = createBrowserRouter(routes);

export default routes;