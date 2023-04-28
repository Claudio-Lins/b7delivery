export const useFormatter = () => ({
  formatPrice: (price: number) => {
    return price.toLocaleString('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    })
  },
  formatQauntity: (qt: number, minDigits: number) => {
    if (qt.toString().length >= minDigits) {
      return qt.toString()
    }
    const remain = minDigits - qt.toString().length
    return `${'0'.repeat(remain)}${qt}`
  },

  formatDate: (data: string) => {
    const date = new Date(data)
    return date.toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
  },
})
