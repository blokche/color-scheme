import styled from 'styled-components'
import { ButtonReset, Stack } from '@tymate/margaret'
import { motion, AnimatePresence } from 'framer-motion'
import { PaletteType } from '../lib/colors'

type PaletteProps = {
    colors: PaletteType
}

type Dictionary = {
    [key: string]: string;
}

const BrightButton = styled(ButtonReset)`
    background-color: white;
    color: black;
    padding: 1rem .5rem;
    border-radius: 5px;
    font-weight: 500;
    width: clamp(80px, 100%, 200px);
    font-size: 1.1em;
    transition: background-color 0.2s linear;
    &:focus-visible {
        outline: solid 2px white;
        outline-offset: 0.15rem;
    }
    &:focus, &:hover {
        background-color: #e2e2f3;
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
    span {
        margin-block-start: 10px;
        color: black;
        font-weight: bold;
        font-size: 0.8rem;
    }
`

const PaletteItemButton = styled(ButtonReset)`
    width: 90px;
    aspect-ratio: 1;
    border-radius: 4px;
    background-color: var(--bg-color, transparent);
    &:focus-visible {
        outline-offset: .2rem;
        outline: solid 2px var(--bg-color);
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

function getDictionary(colors: PaletteType): Dictionary {
  return colors.reduce((acc, curr) => {
    const key = (curr.value * 1000)
    acc[key] = curr.raw?.formatHex() as string
    return acc
  }, {} as Dictionary)
}

export default function Palette({ colors }: PaletteProps) {
  const hasColors = colors.length > 0

  function getRawData() {
    const data = getDictionary(colors)
    navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
      console.log('copy!')
    })
  }

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
                                        <PaletteItemButton aria-label={`Copy variant ${value * 1000}`} style={{
                                          '--bg-color': color,
                                          backgroundColor: color
                                        }}>
                                        </PaletteItemButton>
                                        <span>{value * 1000}</span>
                                    </PaletteItem>
                                ))}
                            </PaletteContainerList>
                            <Stack direction='row' alignX='center' gap={1}>
                                <BrightButton lang='fr' onClick={downLoadJSON}>Télécharger en json</BrightButton>
                                <BrightButton onClick={getRawData}>Raw</BrightButton>
                            </Stack>
                        </motion.div>)
                  : null
            }
        </AnimatePresence>
  )
}
