import { ButtonReset, Stack } from '@tymate/margaret'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { CgColorPicker } from 'react-icons/cg'
import styled from 'styled-components'
import { isValidColorValue } from '../lib/colors'

const Form = styled.form`
    width: clamp(200px, 100%, 600px);
    margin-inline: auto;
`

const ErrorMessage = styled.p`
   text-shadow: 0 0 5px black;
`

const GhostButton = styled(ButtonReset)``

const Input = styled.input`
    text-align: center;
    width: clamp(200px, 100%, 300px);
    padding: 1rem;
    font-size: 1.2rem;
    background-color: white;
    color: var(--color, inherit);
    border-radius: 5px;
    font-weight: 500;
    color: #333;
    outline-offset: 0;
    outline: none;
    transition: outline-offset 0.2s ease, outline-color 0.2s linear;
    &:focus {
        outline-offset: 0.5rem;
        outline: solid 2px white;
    }
`

type ColorPickerProps = {
  onChange?: (value: string | null) => unknown
}

export default function ColorForm({ onChange = () => { } }: ColorPickerProps) {
  const [color, setColor] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [eyeDropperOK, setEyeDropperOK] = useState(false)

  useEffect(() => {
    if ('EyeDropper' in window) {
      setEyeDropperOK(true)
    }
  }, [])

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors([])
    if (!color) {
      setErrors(['Veuillez renseigner la couleur de base afin de générer la palette'])
      return
    }
    if (!isValidColorValue(color)) {
      setErrors(['Format de couleur invalide'])
      return
    }
    onChange(color)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value.toUpperCase())
    if (isValidColorValue(event.target.value)) {
      onChange(event.target.value)
      setErrors([])
    } else {
      onChange(null)
    }
  }

  const pickColor = async () => {
    try {
      const eyeDropper = new (window as any).EyeDropper()
      const { sRGBHex } = await eyeDropper.open()
      if (sRGBHex) {
        const value = sRGBHex.toUpperCase()
        setColor(value)
        if (isValidColorValue(value)) {
          onChange(value)
          setErrors([])
        } else {
          onChange(null)
        }
      }
    } catch (error) { }
  }

  return (
    <Form onSubmit={handleForm}>
      <Stack direction='row' alignX='center'>
        <label className='visually-hidden' htmlFor="color">Pick a color</label>
        <Input type="text" id='color' value={color} onChange={handleChange} />
        {eyeDropperOK && (
          <GhostButton style={{ marginInlineStart: 10 }} onClick={pickColor} type='button'>
            <CgColorPicker aria-hidden='true' size={24} />
            <span className='visually-hidden'>Pick a color</span>
          </GhostButton>
        ) }
      </Stack>
      <div className="errors" aria-live='assertive'>
        {errors.length !== 0 && (<Stack direction='column'>
          {errors.map((error, index) => (
            <ErrorMessage key={index}>{error}</ErrorMessage>
          ))}
        </Stack>)}
      </div>
    </Form>
  )
}
