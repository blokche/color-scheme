import { Stack } from '@tymate/margaret'
import styled from 'styled-components'

const HeaderWrapper = styled(Stack)`
    font-size: 1.4em;
    font-weight: 500;
`

export default function Header() {
  return (
    <header>
      <HeaderWrapper alignX="end">
        <a href="https://margaret.tech/">
          <img
            width='136' height='34'
            aria-label='Margaret'
            src="/assets/margaret-logo.svg" alt="Margaret" />
        </a>
      </HeaderWrapper>
    </header>
  )
}
