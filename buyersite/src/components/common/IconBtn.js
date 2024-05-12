import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disbled,
    outline=false,
    customClasses,
    type
}) => {
  return (
    <button 
    disabled={disbled}
    onClick={onclick}
    type={type}
    className={`flex items-center gap-x-2 ${
       outline?" border bg-site-2 bg-transparent":" bg-site-2"}
       rounded-md cursor-pointer  py-2 px-5 font-semibold text-orange-500 ${customClasses}`}
    >
        {
            children?(
              <>
              <span>{text}</span>
              {children}
              </>
            ):(
                text
            )
        }
    </button>
  )
}

export default IconBtn