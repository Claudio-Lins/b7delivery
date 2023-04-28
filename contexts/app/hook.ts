import { useContext } from 'react';
import { AppContext } from '.';
import { Tenant } from '../../types/Tenant';
import { Actions } from './@types';
import { AddressProps } from '../../types/Address';


export const useAppContext = () => {
  const { state, dispatch } = useContext(AppContext)

  return {
    ...state,
    setTenant: (tenant: Tenant) => {
      dispatch({
        type: Actions.SET_TENANT,
        payload: { tenant}
      })
    },
    setShippingAddress: (shippingAddress: AddressProps) => {
      dispatch({
        type: Actions.SET_SHIPPING_ADDRESS,
        payload: { shippingAddress }
      })
    },
    setShippingPrice: (shippingPrice: number) => {
      dispatch({
        type: Actions.SET_SHIPPING_PRICE,
        payload: { shippingPrice }
      })
    }
  }
}