import { ButtonReset } from '@tymate/margaret'
import { hsl } from 'd3-color'
import { useMemo, useRef } from 'react'
import { MdOutlineArrowDropDown } from 'react-icons/md'
import { useClickAway } from 'react-use'
import styled from 'styled-components'
import { ColorType } from '../lib/colors'

export type ColorFormat = 'rgb' | 'hsl' | 'hexa'
type ColorDetailsProps = {
  color: NonNullable<ColorType>,
  format?: ColorFormat,
  toggleFormat?: Function;
  onClickOutside: Function;
}

const ToggleButton = styled(ButtonReset)`
    padding: 4px;
    font-weight: bold;
`

const ColorDetailsWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 100px repeat(3, minmax(50px, 65px));
  gap: 4px;
  align-items: center;
  &.simple {
    input {
      grid-column: span 3;
    }
  }
`

const ReadonlyInput = styled.input`
    background-color: #F2F1FF;
    border: none;
    cursor: pointer;
    user-select: none;
    border-radius: 8px;
    font-size: 0.9em;
`

function uppercase(value: string): string {
  return value.toUpperCase()
}

const composantesValues = {
  hsl: ['H', 'S', 'L'],
  rgb: ['R', 'G', 'B']
}

export default function ColorDetails({
  color, format = 'rgb',
  toggleFormat = () => { },
  onClickOutside
}: ColorDetailsProps) {
  const labels = useMemo(() => {
    if (format === 'hsl') {
      return composantesValues.hsl
    } else if (format === 'rgb') {
      return composantesValues.rgb
    }
  }, [format])

  const ref = useRef<any>(null)
  const HSL = hsl(color.formatRgb())
  const RGB = color.rgb()
  const HEXA = color.formatHex()

  function getCompleteValue(format: ColorFormat): string | undefined {
    if (format === 'rgb') {
      return RGB.formatRgb()
    } else if (format === 'hsl') {
      return HSL.formatHsl()
    } else if (format === 'hexa') {
      return HEXA.toUpperCase()
    }
  }

  function getComposante(format: ColorFormat, index: 1 | 2 | 3): number {
    if (format === 'hsl') {
      if (index === 1) {
        return HSL.h
      }
      if (index === 2) {
        return HSL.s
      }
      if (index === 3) {
        return HSL.l
      }
    }
    if (format === 'rgb') {
      if (index === 1) {
        return RGB.r
      }
      if (index === 2) {
        return RGB.g
      }
      if (index === 3) {
        return RGB.b
      }
    }
    return 0
  }

  function copyValue(event: any): void {
    navigator.clipboard.writeText(event?.target?.value).then(() => {
      console.log('copy!')
    })
  }

  useClickAway(ref, () => {
    onClickOutside()
  })

  return (
    color
      ? (
        <>
          <ColorDetailsWrapper ref={ref} className={format === 'hexa' ? 'simple' : ''}>
            <ToggleButton onClick={toggleFormat}>
              <MdOutlineArrowDropDown size={28} aria-hidden='true' />
              {uppercase(format)}
            </ToggleButton>
            {format !== 'hexa' && (
              <>
                <span>{labels?.[0]}</span>
                <span>{labels?.[1]}</span>
                <span>{labels?.[2]}</span>
              </>
            )}
            <ReadonlyInput onClick={copyValue} value={getCompleteValue(format)} readOnly={true} />
            {format !== 'hexa' && (
              <>
                <ReadonlyInput
                  onClick={copyValue}
                  value={getComposante(format, 1)}
                  readOnly={true} />
                <ReadonlyInput
                  onClick={copyValue}
                  value={getComposante(format, 2)}
                  readOnly={true} />
                <ReadonlyInput
                  onClick={copyValue}
                  value={getComposante(format, 3)}
                  readOnly={true} />
              </>
            )}
          </ColorDetailsWrapper>
        </>
        )
      : null
  )
}
