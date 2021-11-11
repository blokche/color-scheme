import { Container } from '@tymate/margaret'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import ColorPickerForm from './components/ColorForm'
import Header from './components/Header'
import Logo from './components/Logo'
import Notification from './components/Notification'
import Palette from './components/Palette'
import { generatePalette, PaletteType } from './lib/colors'

const Wrapper = styled(Container)`
  text-align: center;
  color: white;
  padding-inline: calc(1rem + 0.5vw);
`

const Text = styled.p<{ size?: string; bigboy?: boolean; fluid?: boolean }>`
  max-width: 45ch;
  margin-inline: auto;
  margin-block: 1rem;
  &:first-of-type {
    margin-block-start: calc(1.2rem + 1vw);
  }
  &:last-of-type {
    margin-block-end: calc(1.2rem + 1vw);
  }
  font-weight: bold;
  ${props => props.bigboy
    ? css`
      text-transform: uppercase;
      font-weight: normal;
      font-family: 'Rubik One Regular', sans-serif;
  `
    : ''}
  ${props => props.fluid
    ? css`
    font-size: clamp(1.2rem, calc(${props.size || '1.2em'} + 1vw), 2rem);
  `
    : css`
    font-size: ${props.size || '1.2em'};
  `};
  line-height: 1.1;
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
        <Text fluid>
          Never waste hours on finding the perfect gradient palette again!
        </Text>
        <Text size="2em" bigboy>
          Just enter a color:
        </Text>
        <ColorPickerForm
          onChange={handleColorSubmit} />
        <Palette colors={colors} />
        <Notification timeout={3400} />
      </Wrapper>
    </>
  )
}

export default App
