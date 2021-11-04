import styled from 'styled-components'

const LogoImage = styled.img`
  margin-block-start: calc(2rem + 1vw);
`

export default function Logo() {
  return (
    <LogoImage className='logo'
      width="274" height="60"
      src='/assets/color-scheme-logo.svg'
      alt='ColorScheme Logo' />
  )
}
