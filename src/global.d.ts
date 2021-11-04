
declare module '@tymate/margaret' {
    import React from 'react'
    export const Container: React.FunctionComponent<{}>
    export const Stack: React.FunctionComponent<{
        direction?: 'column' | 'row',
        alignX?: 'center' | 'end' | 'start',
        alignY?: 'center' | 'end' | 'start',
        gap?: number;
        style?: React.CSSProperties
    }>
    export const MargaretProvider: React.FunctionComponent<{ theme?: any }>
    export const Button: React.FunctionComponent<{ type?: 'submit' | 'button' }>
    export const ButtonReset: React.FunctionComponent<any>
    export const Dropdown: React.FunctionComponent<any>
}
