export interface ParetoDataItem {
  name: string
  value: number
  cumulativeValue: number
  cumulativePercent: number
  isVitalFew: boolean
  originalIndex: number
}

export function calculateParetoData<T extends Record<string, any>>(
  data: T[],
  valueKey: keyof T,
  nameKey: keyof T
): ParetoDataItem[] {
  if (!data || data.length === 0) return []

  // Sort data by value in descending order
  const sortedData = [...data].sort((a, b) => {
    const aValue = Number(a[valueKey]) || 0
    const bValue = Number(b[valueKey]) || 0
    return bValue - aValue
  })

  // Calculate total sum
  const total = sortedData.reduce((sum, item) => sum + (Number(item[valueKey]) || 0), 0)

  if (total === 0) return []

  // Calculate cumulative values and percentages
  let cumulativeValue = 0
  const paretoData: ParetoDataItem[] = sortedData.map((item, index) => {
    const value = Number(item[valueKey]) || 0
    cumulativeValue += value
    const cumulativePercent = (cumulativeValue / total) * 100
    const isVitalFew = cumulativePercent <= 80

    return {
      name: String(item[nameKey]) || `Item ${index + 1}`,
      value,
      cumulativeValue,
      cumulativePercent,
      isVitalFew,
      originalIndex: index
    }
  })

  return paretoData
}

export function getParetoColors(isVitalFew: boolean): string {
  return isVitalFew ? '#5B7EC5' : '#94A3B8'
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-CO').format(value)
}
