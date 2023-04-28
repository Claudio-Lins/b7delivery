import { AddressProps } from '../types/Address'
import { CartItem } from '../types/CartItem'
import { OrderProps } from '../types/Order'
import { Product } from '../types/Product'
import { User } from '../types/User'

const tempOneProduct: Product = {
  id: 1,
  image: '/productItem/burger.png',
  category: 'Tradicional',
  name: 'X-Burger',
  price: 55.0,
  description:
    '2 Blends de carne de 150g, Queijo Cheddar,Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal',
}

const temporaryOrder: OrderProps = {
  id: 1,
  status: 'sent',
  orderDate: '2021-05-01T00:00:00.000Z',
  userId: '1',
  shippingAddress: {
    id: 1,
    street: 'Estrada de Mem Martins',
    number: '100',
    city: 'Sintra',
    zipCode: '2724-381',
    neighborhood: 'Mem Martins',
    state: 'LX',
  },
  shippingPrice: 5.55,
  paymentType: 'card',
  paymentChange: 100,
  cupom: 'CUPOM10',
  cupomDiscount: 10,
  products: [
    {product: { ...tempOneProduct, id: 1}, quantity: 1},
    {product: { ...tempOneProduct, id: 2}, quantity: 3},
    {product: { ...tempOneProduct, id: 3}, quantity: 2}
  ],
  subtotal: 165,
  total: 170.55,
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
    for (let p = 0; p < 3; p++) {
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
  getCartProduct: async (cartCookie: string) => {
    let cart: CartItem[] = []
    if (!cartCookie) return cart

    const cartJson = JSON.parse(cartCookie)
    for (let i in cartJson) {
      if (cartJson[i].id && cartJson[i].quantity) {
        const product = {
          ...tempOneProduct,
          id: cartJson[i].id,
        }
        cart.push({
          quantity: cartJson[i].quantity,
          product,
        })
      }
    }

    return cart
  },
  getUserAddress: async (email: string) => {
    const addresses: AddressProps[] = []
    for (let i = 0; i < 4; i++) {
      addresses.push({
        id: i + 1,
        street: 'Estrada de Mem Martins',
        number: `${i + 1}00`,
        city: 'Sintra',
        zipCode: '2724-381',
        neighborhood: 'Mem Martins',
        state: 'LX',
      })
    }

    return addresses
  },

  addUserAddress: async (address: AddressProps) => {
    console.log(address)
    return {
      ...address,
      id: 5,
    }
  },
  editUserAddress: async (newAddressData: AddressProps) => {
    console.log(newAddressData)
    return newAddressData
  },

  deleteUserAddress: async (addressId: number) => {
    return true
  },

  getUserAddressById: async (addressId: number) => {
    const address: AddressProps = {
      id: addressId,
      street: 'Estrada de Mem Martins',
      number: `${addressId}00`,
      city: 'Sintra',
      zipCode: '2724-381',
      neighborhood: 'Mem Martins',
      state: 'LX',
    }
    return address
  },

  getShippingPrice: async (address: AddressProps) => {
    return 5.55
  },

  createOrder: async (
    address: AddressProps,
    paymentType: string,
    paymentChange: number,
    cupom: string,
    cart: CartItem[]
  ) => {
    return temporaryOrder
  },

  getOrder: async (orderId: number) => {
    return temporaryOrder
  }
})
