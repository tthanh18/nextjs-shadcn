import { FC } from 'react'
import { Input, InputProps } from '@/components/ui/input'

interface ICustomInputProps extends InputProps {
    isNumber?: boolean
}

export const CustomInput: FC<ICustomInputProps> = (props) => {
    const { isNumber, ...rest } = props

    return <Input {...rest} />
}
