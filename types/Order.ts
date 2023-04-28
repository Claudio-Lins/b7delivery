import { AddressProps } from "./Address"
import { CartItem } from "./CartItem"

export type OrderProps = {
  id: number
  status: 'preparing' | 'sent' | 'delivered'
  orderDate: string
  userId: string
  shippingAddress: AddressProps
  shippingPrice: number
  paymentType: 'money' | 'card'
  paymentChange?: number
  cupom?: string
  cupomDiscount?: number
  products: CartItem[]
  subtotal: number
  total: number
}