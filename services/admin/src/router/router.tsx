import {createBrowserRouter, RouteObject} from "react-router-dom";
import {App} from "@/App";
import {Suspense} from "react";
import AdminLazy from "@/pages/admin/Admin.lazy";

const routes: RouteObject[] = [
  {
    path: '/admin',
    element: <App/>,
    children: [
      {
        path: '/admin',
        element: <Suspense fallback='Loading...'> <AdminLazy/> </Suspense>
      },

    ]
  },
]
export const router = createBrowserRouter(routes);

export default routes;