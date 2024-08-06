import tailwindConfig from '../../../tailwind.config'

export type TScreenBreakpoint = keyof typeof tailwindConfig.theme.extend.screens
