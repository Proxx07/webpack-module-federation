import {Category} from "@/components/Category/Category";
import {ICategory, categories} from "@packages/shared/src/common";

const Shop = () => {
  return (
    <>
      <h1> Shop page </h1>

      {categories.map((category: ICategory) => {
        return <Category category={category} key={category.name}/>
      })}
    </>
  )
}

export default Shop;