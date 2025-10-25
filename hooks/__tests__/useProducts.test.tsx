import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useProducts } from '../useProducts'

// Mock the API
jest.mock('../../lib/api', () => ({
  productsApi: {
    getProducts: jest.fn().mockResolvedValue({
      data: [
        { id: 1, name: 'Laptop', price: 999.99 },
        { id: 2, name: 'Mouse', price: 29.99 },
      ],
      metadata: {
        page: 0,
        size: 10,
        total: 2,
      },
    }),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
  },
}))

// Mock the notification context
jest.mock('../../contexts/NotificationContext', () => ({
  useNotification: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn(),
  }),
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useProducts Hook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    })

    expect(result.current.products).toEqual([])
    expect(result.current.isLoading).toBe(true)
    expect(typeof result.current.createProduct).toBe('object')
    expect(typeof result.current.updateProduct).toBe('object')
    expect(typeof result.current.deleteProduct).toBe('object')
  })

  it('provides notification functions', () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    })

    expect(typeof result.current.showSuccess).toBe('function')
    expect(typeof result.current.showError).toBe('function')
  })
})
