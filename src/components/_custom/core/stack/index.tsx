import { ComponentProps, ElementRef, FC, forwardRef, Ref } from 'react'
import { cn } from '@/lib/utils'

interface IStackProps extends ComponentProps<'div'> {}

export const Stack = forwardRef<ElementRef<'div'>, IStackProps>((props, ref) => {
    const { children, className, ...rest } = props

    return (
        <div className={cn('flex flex-col gap-4', className)} {...rest}>
            {children}
        </div>
    )
})
