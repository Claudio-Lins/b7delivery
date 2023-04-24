import { Product } from '../types/Product'
import { User } from '../types/User'

const tempOneProduct: Product = {
  id: 1,
  image: '/productItem/burger.png',
  category: 'Tradicional',
  name: 'Tamandaré',
  price: 55.0,
  description:
    '2 Blends de carne de 150g, Queijo Cheddar,Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal',
}

export const useApi = (tenantSlug: string) => ({
  getTenant: async () => {
    switch (tenantSlug) {
      case 'b7burger':
        return {
          slug: 'b7burger',
          name: 'B7Burger',
          primaryColor: '#FB9400',
          secondaryColor: '#fff9f2',
        }
        break
      case 'b7pizza':
        return {
          slug: 'b7pizza',
          name: 'B7Pizza',
          primaryColor: '#6AB70A',
          secondaryColor: '#E0E0E0',
        }
        break
      default:
        return false
    }
  },
  getAllProducts: async () => {
    let products: Product[] = []
    for (let p = 0; p < 10; p++) {
      products.push({
        ...tempOneProduct,
        id: p + 1,
      })
    }

    return products
  },
  getProduct: async (id: number) => {
    return { ...tempOneProduct, id }
  },

  authorizeToken: async (token: string): Promise<User | false> => {
    if (!token) {
      return false
    }
    return {
      name: 'Claudio lins',
      email: 'clins@me.com',
    }
  },
})
