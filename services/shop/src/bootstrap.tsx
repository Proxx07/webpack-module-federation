import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {router} from "@/router/router";

const root = document.querySelector('#root')

const app = createRoot(root)

app.render(
  <RouterProvider router={router}/>
)