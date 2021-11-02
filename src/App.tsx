import ColorPickerForm from "./components/ColorForm";
import { Container } from '@tymate/margaret';
import { useEffect, useState } from "react";
import { generatePalette, PaletteType } from "./lib/colors";
import Palette from "./components/Palette";
import styled from "styled-components";
import Header from "./components/Header";

const Wrapper = styled(Container)`
  text-align: center;
  color: white;
  padding-inline: calc(1rem + 0.5vw);
`

const Text = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  &.uppercase {
    text-transform: uppercase;
  }
`

function App() {

  const [baseColor, setBaseColor] = useState<string>('');
  const [colors, setColors] = useState<PaletteType>([]);

  const handleColorSubmit = (value: string | null) => {
    setBaseColor(value ? value : '');
  }

  useEffect(() => {
    const palette = generatePalette(baseColor);
    if (palette.length) {
      setColors(palette);
    } else {
      setColors([]);
    }
  }, [baseColor])

  return (
    <>
      <Wrapper>
        <Header />
        <Text>Never waste hours on finding the perfect gradient palette again!</Text>
        <Text className='uppercase'>Just enter a color:</Text>
        <ColorPickerForm onChange={handleColorSubmit} />
        <Palette colors={colors} />
      </Wrapper>
    </>
  );
}

export default App;
