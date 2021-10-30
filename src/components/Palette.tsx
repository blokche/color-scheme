import { CSSProperties } from "react"
import styled from 'styled-components'
import { ColorsArrayType } from "../lib/colors"
import { ButtonReset, Stack } from '@tymate/margaret';
import { motion, AnimatePresence } from 'framer-motion';

type PaletteProps = {
    colors: ColorsArrayType
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
`;

const PaletteContainer = styled.section`
    padding: 3rem 2rem;
    margin-block: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, 80px);
    gap: 1rem;
    justify-content: center;
    background: white;
    border-radius: 10px;
    width: 90%;
    margin-inline: auto;
`

const PaletteItem = styled(ButtonReset)`
    width: 80px;
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

export default function Palette({ colors }: PaletteProps) {

    const hasColors = colors.length > 0;

    return (
        <AnimatePresence>
            {
                hasColors ? (
                    <motion.div variants={choregraphy} initial='from' animate='to' exit='exit'>
                        <PaletteContainer>
                            {colors.map((color, index) => (
                                <PaletteItem aria-label='Copy variant' key={index} style={{
                                    '--bg-color': color.formatRgb()
                                } as CSSProperties}>
                                </PaletteItem>))}
                        </PaletteContainer>
                        <Stack direction='row' alignX='center' gap={1}>
                            <BrightButton lang='fr'>Télécharger en json</BrightButton>
                            <BrightButton>Raw</BrightButton>
                        </Stack>
                    </motion.div>) : null
            }
        </AnimatePresence>
    );
}