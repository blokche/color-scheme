import styled from 'styled-components'
import { Stack } from '@tymate/margaret'

const HeaderWrapper = styled(Stack)`
    font-size: 1.4em;
    font-weight: 500;
`

export default function Header() {
  return (
        <header>
            <HeaderWrapper alignX="end">
                Margaret
            </HeaderWrapper>
        </header>
  )
}
