export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    color?: 'white' | 'gray' | 'black' | 'blue' | 'green' | 'red' | 'yellow' | string
}

export const sizeClasses: Record<NonNullable<SpinnerProps['size']>, string> = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
}

export const colorClasses: Record<NonNullable<SpinnerProps['color']>, string> = {
    white: 'border-white',
    gray: 'border-gray-500',
    black: 'border-black',
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    yellow: 'border-yellow-500',
}