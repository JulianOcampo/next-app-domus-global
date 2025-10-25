import { render, screen } from '@testing-library/react'
import ProductForm from '../ProductForm'
import { describe, expect, it, jest } from '@jest/globals'

// Mock the useProducts hook
jest.mock('../../hooks/useProducts', () => ({
  useProducts: () => ({
    products: [],
    metadata: undefined,
    isLoading: false,
    createProduct: {
      mutate: jest.fn(),
      isPending: false,
    },
    updateProduct: { mutate: jest.fn(), isPending: false },
    deleteProduct: { mutate: jest.fn(), isPending: false },
    showSuccess: jest.fn(),
    showError: jest.fn(),
  }),
}))

describe('ProductForm Component', () => {
  it('renders form fields correctly', () => {
    render(<ProductForm />)
    expect(screen.getByText('Agregar Producto')).toBeDefined()
    expect(screen.getByDisplayValue('')).toBeDefined() // Name input
    expect(screen.getByDisplayValue('0')).toBeDefined() // Price input
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeDefined()
  })

  it('has correct form structure', () => {
    render(<ProductForm />)

    const nameInput = screen.getByDisplayValue('') as HTMLInputElement;
    const priceInput = screen.getByDisplayValue('0') as HTMLInputElement;
    expect(nameInput.getAttribute('name')).toBe('name');
    expect(priceInput.getAttribute('name')).toBe('price');
    expect(priceInput.getAttribute('type')).toBe('number');
  })
})