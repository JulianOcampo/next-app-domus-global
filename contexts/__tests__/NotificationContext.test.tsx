import { render, screen, act } from '@testing-library/react'
import { NotificationProvider, useNotification } from '../NotificationContext'
import { ReactNode } from 'react'

// Test component that uses the notification context
const TestComponent = () => {
  const { showSuccess, showError, showInfo, hideNotification, notification } = useNotification()

  return (
    <div>
      <button onClick={() => showSuccess('Success message')}>Show Success</button>
      <button onClick={() => showError('Error message')}>Show Error</button>
      <button onClick={() => showInfo('Info message')}>Show Info</button>
      <button onClick={hideNotification}>Hide Notification</button>
      {notification.isVisible && (
        <div data-testid="notification">
          {notification.message} - {notification.type}
        </div>
      )}
    </div>
  )
}

// Wrapper component for testing
const TestWrapper = ({ children }: { children: ReactNode }) => (
  <NotificationProvider>{children}</NotificationProvider>
)

describe('NotificationContext', () => {
  it('provides initial notification state', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )

    expect(screen.queryByTestId('notification')).not.toBeInTheDocument()
  })

  it('shows success notification', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )

    act(() => {
      screen.getByText('Show Success').click()
    })

    expect(screen.getByTestId('notification')).toBeInTheDocument()
    expect(screen.getByText('Success message - success')).toBeInTheDocument()
  })

  it('shows error notification', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )

    act(() => {
      screen.getByText('Show Error').click()
    })

    expect(screen.getByTestId('notification')).toBeInTheDocument()
    expect(screen.getByText('Error message - error')).toBeInTheDocument()
  })

  it('shows info notification', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )

    act(() => {
      screen.getByText('Show Info').click()
    })

    expect(screen.getByTestId('notification')).toBeInTheDocument()
    expect(screen.getByText('Info message - info')).toBeInTheDocument()
  })

  it('hides notification when hideNotification is called', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )

    // Show notification first
    act(() => {
      screen.getByText('Show Success').click()
    })

    expect(screen.getByTestId('notification')).toBeInTheDocument()

    // Hide notification
    act(() => {
      screen.getByText('Hide Notification').click()
    })

    expect(screen.queryByTestId('notification')).not.toBeInTheDocument()
  })

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = jest.fn()

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useNotification must be used within a NotificationProvider')

    console.error = originalError
  })

  it('updates notification state correctly', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )

    // Show success notification
    act(() => {
      screen.getByText('Show Success').click()
    })

    expect(screen.getByText('Success message - success')).toBeInTheDocument()

    // Change to error notification
    act(() => {
      screen.getByText('Show Error').click()
    })

    expect(screen.getByText('Error message - error')).toBeInTheDocument()
  })
})
