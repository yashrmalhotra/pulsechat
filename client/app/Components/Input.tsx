"use client"
import { InputProps } from "@/Types/type"
import React, { memo } from "react"

const InputField: React.FC<InputProps> = ({
  labelText,
  mendatory,
  placeholder,
  additionalStyle,
  register,
  error,
  disabled,
}) => {
  return (
    <div className={`flex flex-col ${additionalStyle} h-20`}>
      <label className="font-semibold text-white">
        {labelText} <span className="text-red-400">{mendatory}</span>
      </label>
      <input
        disabled={disabled && disabled}
        {...(register ? register : {})}
        placeholder={placeholder}
        className="border border-[#00ffff] text-white rounded-2xl p-2 h-10 focus:outline-0"
      />
      {error && <p className="text-red-500 font-bold">{error}</p>}
    </div>
  )
}

export default memo(InputField)
