import { Tenant } from "../types/Tenant"


export const useApi = () => ({
  getTenant: (tenantSlug: string): boolean | Tenant => {
    switch (tenantSlug) {
      case 'b7burger':
        return {
          slug: 'b7burger',
          name: 'B7Burger',
          primaryColor: '#0000ff',
          secondaryColor: '#ffff00',
        }
        break
      case 'b7pizza':
        return {
          slug: 'b7pizza',
          name: 'B7Pizza',
          primaryColor: '#ff00FF',
          secondaryColor: '#00ff00',
        }
        break
      default:
        return false
    }
  },
})
