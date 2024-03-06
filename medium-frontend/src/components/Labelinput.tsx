import React, { ChangeEvent } from 'react'

interface LabelinputProps {
  label: string
  placeholder: string
  onChange: (e : ChangeEvent<HTMLInputElement>) => void
  type:string
  required?:boolean
  className?: string
  value?:string
  
}

const Labelinput = ({ label, placeholder, onChange ,type,required,className, value}: LabelinputProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-sm font-semibold'>{label}</label>
      <input onChange={onChange} className={className} value={value} type={type} placeholder={placeholder} required={required}/>
    </div>
  )
}

export default Labelinput