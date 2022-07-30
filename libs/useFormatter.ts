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
})
