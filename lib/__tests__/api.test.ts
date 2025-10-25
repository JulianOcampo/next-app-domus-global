import { Product, ProductUpsertRequest } from '../api'

describe('API Types', () => {
  it('has correct Product interface', () => {
    const product: Product = {
      id: 1,
      name: 'Test Product',
      price: 99.99,
    }

    expect(product.id).toBe(1)
    expect(product.name).toBe('Test Product')
    expect(product.price).toBe(99.99)
  })

  it('has correct ProductUpsertRequest interface', () => {
    const productRequest: ProductUpsertRequest = {
      name: 'Test Product',
      price: 99.99,
    }

    expect(productRequest.name).toBe('Test Product')
    expect(productRequest.price).toBe(99.99)
  })

  it('validates Product interface structure', () => {
    const product: Product = {
      id: 1,
      name: 'Laptop',
      price: 999.99,
    }

    expect(typeof product.id).toBe('number')
    expect(typeof product.name).toBe('string')
    expect(typeof product.price).toBe('number')
    expect(product.id).toBeGreaterThan(0)
    expect(product.name.length).toBeGreaterThan(0)
    expect(product.price).toBeGreaterThan(0)
  })

  it('validates ProductUpsertRequest interface structure', () => {
    const productRequest: ProductUpsertRequest = {
      name: 'New Product',
      price: 149.99,
    }

    expect(typeof productRequest.name).toBe('string')
    expect(typeof productRequest.price).toBe('number')
    expect(productRequest.name.length).toBeGreaterThan(0)
    expect(productRequest.price).toBeGreaterThan(0)
  })
})
