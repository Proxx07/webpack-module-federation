export interface IProduct {
  id: string
  name: string
  image?: string
  description?: string
}

export const product: IProduct = {
  id: 'test prod id 7891345987',
  name: 'Test product name',
  description: 'Test product description',
}