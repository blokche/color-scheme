import { ButtonReset, Stack } from '@tymate/margaret'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PaletteType } from '../lib/colors'
import ColorDetails, { ColorFormat } from './ColorDetails'

type PaletteProps = {
  colors: PaletteType
}

type Dictionary = {
  [key: string]: string;
}

const BrightButton = styled(ButtonReset)`
    --offset: 8px;
    background-color: white;
    color: black;
    padding: 1rem .5rem;
    border-radius: 5px;
    font-weight: 500;
    width: clamp(80px, 100%, 200px);
    font-size: 1.1em;
    position: relative;
    transition: transform 200ms ease-in, background-color 140ms linear;
    &:focus-visible {
        outline: solid 2px white;
        outline-offset: 0.15rem;
    }
    &:active {
      transform: translateY(var(---offset, 5px));
      background-color: rgb(255 255 255 / 0.1);
      &::before {
        transform: translateY(calc(var(---offset, 5px) * -1));
      }
    }
    &:focus, &:hover {
        background-color: #e2e2f3;
    }
    &::before {
      content: '';
      width: calc(100% + var(---offset, 10px));
      border-radius: inherit;
      left: calc(var(---offset, 10px) / -2);
      top: var(---offset, 8px);
      position: absolute;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
      transition: transform 200ms ease;
      background-image: linear-gradient(to left,
        #FAA8FF, #B4A8FF, #A8FFEF, #FFECA8
        );
      opacity: 0.8;
}
`

const PaletteContainerList = styled.ul`
    padding: 3rem 1.6rem;
    margin-block: 2rem;
    display: grid;
    list-style: none;
    grid-template-columns: repeat(auto-fit, 90px);
    gap: 0.5rem;
    justify-content: center;
    background: white;
    border-radius: 10px;
    width: 90%;
    margin-inline: auto;
`

const PaletteItem = styled.li`
    position:relative;
    & > span {
        margin-block-start: 10px;
        color: black;
        font-weight: bold;
        font-size: 0.8rem;
    }
`

const PaletteItemButton = styled(ButtonReset)`
    width: 90px;
    aspect-ratio: 1;
    border-radius: 12px;
    background-color: var(--bg-color, transparent);
    &:focus-visible {
        outline-offset: .2rem;
        outline: solid 2px var(--bg-color);
    }
    & + div {
      list-style: none;
      margin: 0;
      position: absolute;
      width: clamp(300px, 100px, 340px);
      border-radius: 5px;
      background-color: white;
      transform: translate3d(-50%, -70%, 0);
      top: -10%;
      left: 50%;
      filter: drop-shadow(0 0 3px rgb(0 0 0 / 0.5));
      color: black;
      z-index: 1;
      &::before {
        z-index: -1;
        content: '';
        border: solid 6px white;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%) rotate(45deg);
      }
    }
`

const choregraphy = {
  from: {
    y: -8,
    opacity: 0
  },
  to: {
    y: 0,
    opacity: 1
  },
  exit: {
    opacity: 0
  }
}

const dropdownVariants = {
  from: {
    opacity: 0,
    transition: { duration: 0.2 }
  },
  to: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
}

function getDictionary(colors: PaletteType): Dictionary {
  return colors.reduce((acc, curr) => {
    const key = (curr.value * 1000)
    acc[key] = curr.raw?.formatHex() as string
    return acc
  }, {} as Dictionary)
}

export default function Palette({ colors }: PaletteProps) {
  const hasColors = colors.length > 0
  const [selection, setSelection] = useState<number | null>(null)
  const selectedColor = selection !== null ? colors[selection]?.raw : null
  const [colorFormat, setColorFormat] = useState<ColorFormat>('rgb')

  const toggleFormat = useCallback(() => {
    if (colorFormat === 'rgb') {
      setColorFormat('hsl')
    } else if (colorFormat === 'hsl') {
      setColorFormat('hexa')
    } else if (colorFormat === 'hexa') {
      setColorFormat('rgb')
    }
  }, [colorFormat])

  function getRawData() {
    const data = getDictionary(colors)
    navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
      console.log('copy!')
    })
  }

  function onEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      close()
    }
  }

  const close = useCallback(function close() {
    setSelection(null)
  }, [])

  useEffect(() => {
    setSelection(null)
  }, [hasColors])

  useEffect(() => {
    if (selection !== null) {
      window.addEventListener('keydown', onEscape)
    } else {
      window.removeEventListener('keydown', onEscape)
    }
    return () => {
      window.removeEventListener('keydown', onEscape)
    }
  }, [selection])

  function downLoadJSON() {
    const data = getDictionary(colors)
    const blob = new Blob([JSON.stringify(data)], { type: 'text/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'palette.json')
    link.click()
    URL.revokeObjectURL(url)
    link.remove()
  }

  return (
    <AnimatePresence>
      {
        hasColors
          ? (
            <motion.div variants={choregraphy} initial='from' animate='to' exit='exit'>
              <PaletteContainerList>
                {colors.map(({ value, color }, index) => (
                  <PaletteItem key={index} >
                    <PaletteItemButton onClick={() => setSelection(index)}
                      aria-label={`Copy variant ${value * 1000}`} style={{
                        '--bg-color': color,
                        backgroundColor: color
                      }}>
                    </PaletteItemButton>
                    <AnimatePresence>
                      {selection === index
                        ? (
                          <motion.div variants={dropdownVariants} initial='from' exit='exit' animate='to'>
                            {selectedColor && (
                              <ColorDetails
                                onClickOutside={close}
                                color={selectedColor}
                                format={colorFormat}
                                toggleFormat={toggleFormat}
                              />
                            )}
                          </motion.div>
                          )
                        : null}
                    </AnimatePresence>
                    <span>{value * 1000}</span>
                  </PaletteItem>
                ))}
              </PaletteContainerList>
              <Stack direction='row' alignX='center' gap={1} style={{ marginBlockEnd: '1rem' }}>
                <BrightButton lang='fr' onClick={downLoadJSON}>Télécharger en json</BrightButton>
                <BrightButton onClick={getRawData}>Raw</BrightButton>
              </Stack>
            </motion.div>)
          : null
      }
    </AnimatePresence >
  )
}
