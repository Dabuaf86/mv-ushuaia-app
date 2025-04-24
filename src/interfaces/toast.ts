export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
    id: number
    message: string
    type?: ToastType
}

export interface ToastContextType {
    toasts: Toast[]
    show: (message: string, type?: ToastType) => void
    success: (message: string) => void
    error: (message: string) => void
    info: (message: string) => void
}