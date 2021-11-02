import { ChangeEvent, FormEvent, useState } from 'react'
import { Stack } from '@tymate/margaret'
import { isValidColorValue } from '../lib/colors'
import styled from 'styled-components'

const Form = styled.form`
    width: clamp(200px, 100%, 600px);
    margin-inline: auto;
`

const Input = styled.input`
    text-align: center;
    width: clamp(200px, 100%, 300px);
    margin-inline: auto;
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

  return (
        <Form onSubmit={handleForm}>
            <Stack direction='column'>
                <label className='visually-hidden' htmlFor="color">Pick a color</label>
                <Input type="text" id='color' value={color} onChange={handleChange} />
            </Stack>
            <div className="errors" aria-live='assertive'>
                {errors.length !== 0 && (<Stack direction='column'>
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </Stack>)}
            </div>
        </Form>
  )
}
