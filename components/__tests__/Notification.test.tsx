import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Notification from '../Notification'

describe('Notification Component', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders success notification correctly', () => {
    render(
      <Notification
        message="Producto creado exitosamente"
        type="success"
        isVisible={true}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByText('Producto creado exitosamente')).toBeInTheDocument()
    expect(screen.getByText('✅')).toBeInTheDocument()
  })

  it('renders error notification correctly', () => {
    render(
      <Notification
        message="Error al crear el producto"
        type="error"
        isVisible={true}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByText('Error al crear el producto')).toBeInTheDocument()
    expect(screen.getByText('❌')).toBeInTheDocument()
  })

  it('renders info notification correctly', () => {
    render(
      <Notification
        message="Información importante"
        type="info"
        isVisible={true}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByText('Información importante')).toBeInTheDocument()
    expect(screen.getByText('ℹ️')).toBeInTheDocument()
  })

  it('does not render when isVisible is false', () => {
    render(
      <Notification
        message="Test message"
        type="success"
        isVisible={false}
        onClose={mockOnClose}
      />
    )

    expect(screen.queryByText('Test message')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    render(
      <Notification
        message="Test message"
        type="success"
        isVisible={true}
        onClose={mockOnClose}
      />
    )

    const closeButton = screen.getByText('✕')
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('auto-closes after default duration (3000ms)', async () => {
    render(
      <Notification
        message="Test message"
        type="success"
        isVisible={true}
        onClose={mockOnClose}
      />
    )

    expect(mockOnClose).not.toHaveBeenCalled()

    // Fast-forward time by 3000ms
    jest.advanceTimersByTime(3000)

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })

  it('auto-closes after custom duration', async () => {
    render(
      <Notification
        message="Test message"
        type="success"
        isVisible={true}
        onClose={mockOnClose}
        duration={5000}
      />
    )

    expect(mockOnClose).not.toHaveBeenCalled()

    // Fast-forward time by 5000ms
    jest.advanceTimersByTime(5000)

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })

  it('clears timer when component unmounts', () => {
    const { unmount } = render(
      <Notification
        message="Test message"
        type="success"
        isVisible={true}
        onClose={mockOnClose}
      />
    )

    unmount()

    // Fast-forward time to ensure timer was cleared
    jest.advanceTimersByTime(3000)

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('has correct CSS classes for success type', () => {
    render(
      <Notification
        message="Test message"
        type="success"
        isVisible={true}
        onClose={mockOnClose}
      />
    )

    const notification = screen.getByText('Test message').closest('div')?.parentElement
    expect(notification).toHaveClass('bg-green-500', 'border-green-600', 'text-white')
  })

  it('has correct CSS classes for error type', () => {
    render(
      <Notification
        message="Test message"
        type="error"
        isVisible={true}
        onClose={mockOnClose}
      />
    )

    const notification = screen.getByText('Test message').closest('div')?.parentElement
    expect(notification).toHaveClass('bg-red-500', 'border-red-600', 'text-white')
  })

  it('has correct CSS classes for info type', () => {
    render(
      <Notification
        message="Test message"
        type="info"
        isVisible={true}
        onClose={mockOnClose}
      />
    )

    const notification = screen.getByText('Test message').closest('div')?.parentElement
    expect(notification).toHaveClass('bg-blue-500', 'border-blue-600', 'text-white')
  })
})
