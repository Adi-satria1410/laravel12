import { useId } from 'react';

interface PlaceholderPatternProps {
    className?: string;
}

export function PlaceholderPattern({ className }: PlaceholderPatternProps) {
    const patternId = useId();

    return (
        <svg className={className} fill="none">
            <defs>
                <pattern
                    id={patternId}
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                >
                    {/* Garis silang ke kanan */}
                    <path d="M0 0 L20 20" stroke="orange" strokeWidth="0.5" />
                    {/* Garis silang ke kiri */}
                    <path d="M20 0 L0 20" stroke="orange" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect fill={`url(#${patternId})`} width="100%" height="100%" />
        </svg>
    );
}
