import { ComponentProps, ElementRef, FC, forwardRef, Ref } from 'react'
import { cn } from '@/lib/utils'

interface IGroupProps extends ComponentProps<'div'> {}

export const Group = forwardRef<ElementRef<'div'>, IGroupProps>((props, ref) => {
    const { children, className, ...rest } = props

    return (
        <div className={cn('flex gap-4 flex-wrap justify-start items-center', className)} {...rest}>
            {children}
        </div>
    )
})
