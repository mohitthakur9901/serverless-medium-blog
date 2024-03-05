import React, { ChangeEvent } from 'react'

interface LabelinputProps {
  label: string
  placeholder: string
  onChange: (e : ChangeEvent<HTMLInputElement>) => void
  type:string
}

const Labelinput = ({ label, placeholder, onChange ,type}: LabelinputProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-sm font-semibold'>{label}</label>
      <input onChange={onChange} className='border-2 border-black rounded-md p-2' type={type} placeholder={placeholder} required/>
    </div>
  )
}

export default Labelinput