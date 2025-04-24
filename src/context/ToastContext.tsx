'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { Toast, ToastContextType, ToastType } from '@/interfaces/toast'

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = (message: string, type: ToastType = 'info') => {
        const id = Date.now()
        const newToast: Toast = { id, message, type }
        setToasts(prev => [...prev, newToast])
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 3000)
    }

    return (
        <ToastContext.Provider value={{
            toasts,
            show: showToast,
            success: (message: string) => showToast(message, 'success'),
            error: (message: string) => showToast(message, 'error'),
            info: (message: string) => showToast(message, 'info')
        }}>
            {children}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map(({ id, message, type }) => (
                    <div
                        key={id}
                        className={`px-4 py-2 rounded shadow text-white text-sm ${type === 'success' ? 'bg-green-600'
                            : type === 'error' ? 'bg-red-600'
                                : 'bg-blue-600'
                            }`}
                    >
                        {message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast debe usarse dentro de <ToastProvider>')
    return context
}
