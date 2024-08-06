import { ComponentProps, ElementRef, FC, forwardRef, Ref } from 'react'
import { cn } from '@/lib/utils'

interface IContainerProps extends ComponentProps<'div'> {}

export const Container = forwardRef<ElementRef<'div'>, IContainerProps>((props, ref) => {
    const { children, className, ...rest } = props

    return (
        <div className={cn('flex justify-center items-center', className)} {...rest}>
            {children}
        </div>
    )
})
