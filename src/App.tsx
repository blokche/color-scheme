import ColorPickerForm from './components/ColorForm'
import { Container } from '@tymate/margaret'
import { useEffect, useState } from 'react'
import { generatePalette, PaletteType } from './lib/colors'
import Palette from './components/Palette'
import styled, { css } from 'styled-components'
import Header from './components/Header'
import Logo from './components/Logo'

const Wrapper = styled(Container)`
  text-align: center;
  color: white;
  padding-inline: calc(1rem + 0.5vw);
`

const Text = styled.p<{ size?: string; upper?: boolean }>`
  max-width: 45ch;
  margin-inline: auto;
  font-size: ${(props) => props.size || '1.2em'};
  ${props => props.upper
  ? css`
    text-transform: uppercase;
  `
: ''}
  line-height: 1.1;
  font-weight: bold;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
`

function App() {
  const [baseColor, setBaseColor] = useState<string>('')
  const [colors, setColors] = useState<PaletteType>([])

  const handleColorSubmit = (value: string | null) => {
    setBaseColor(value || '')
  }

  useEffect(() => {
    const palette = generatePalette(baseColor)
    if (palette.length) {
      setColors(palette)
    } else {
      setColors([])
    }
  }, [baseColor])

  return (
    <>
      <Wrapper>
        <Header />
        <Logo />
        <Text size="1.4em">Never waste hours on finding the perfect gradient palette again!</Text>
        <Text size="2em" upper>Just enter a color:</Text>
        <ColorPickerForm onChange={handleColorSubmit} />
        <Palette colors={colors} />
      </Wrapper>
    </>
  )
}

export default App
