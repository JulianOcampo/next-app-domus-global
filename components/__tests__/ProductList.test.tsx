import { render, screen } from '@testing-library/react'
import ProductList from '../ProductList'

// Mock the useProducts hook
jest.mock('../../hooks/useProducts', () => ({
  useProducts: () => ({
    products: [
      { id: 1, name: 'Laptop', price: 999.99 },
      { id: 2, name: 'Mouse', price: 29.99 },
    ],
    metadata: {
      page: 0,
      size: 10,
      total: 2,
    },
    isLoading: false,
    createProduct: { mutate: jest.fn(), isPending: false },
    updateProduct: { mutateAsync: jest.fn(), isPending: false },
    deleteProduct: { mutateAsync: jest.fn(), isPending: false },
    showSuccess: jest.fn(),
    showError: jest.fn(),
  }),
}))

describe('ProductList Component', () => {
  it('renders product list correctly', () => {
    render(<ProductList />)

    expect(screen.getByText('Lista de productos')).toBeInTheDocument()
    expect(screen.getByText('Laptop')).toBeInTheDocument()
    expect(screen.getByText('Mouse')).toBeInTheDocument()
    expect(screen.getByText('$999.99')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<ProductList />)

    expect(screen.getByPlaceholderText('Buscar por nombre...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument()
  })

  it('renders table headers', () => {
    render(<ProductList />)

    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Precio')).toBeInTheDocument()
    expect(screen.getByText('Acciones')).toBeInTheDocument()
  })

  it('shows results info', () => {
    render(<ProductList />)

    expect(screen.getByText('Mostrando 2 de 2 productos')).toBeInTheDocument()
  })
})
