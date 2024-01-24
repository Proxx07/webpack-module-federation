import classNames from "./Category.module.scss";
import {ICategory} from "@packages/shared/src/common";

export const Category = ({category}: {category: ICategory}) => {
  return <div className={classNames.category}> {category.name} </div>
}