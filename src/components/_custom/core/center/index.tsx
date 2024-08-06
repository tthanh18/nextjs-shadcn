import { ComponentProps, ElementRef, FC, forwardRef, Ref } from 'react'
import { cn } from '@/lib/utils'

interface ICenterProps extends ComponentProps<'div'> {}

export const Center = forwardRef<ElementRef<'div'>, ICenterProps>((props, ref) => {
    const { children, className, ...rest } = props

    return (
        <div className={cn('flex justify-center items-center', className)} {...rest}>
            {children}
        </div>
    )
})
