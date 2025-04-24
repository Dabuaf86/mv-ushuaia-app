import { colorClasses, sizeClasses, SpinnerProps } from '@/interfaces/spinner'

export default function Spinner({ size = 'md', color = 'white' }: SpinnerProps) {
    const sizeClass = sizeClasses[size]
    const colorClass = colorClasses[color] || color
    return (
        <div className={`${sizeClass} border-2 ${colorClass} border-t-transparent rounded-full animate-spin`} />
    );
}
