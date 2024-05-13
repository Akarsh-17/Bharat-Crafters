import React, { useEffect } from 'react'

const useOnClickOutside = (ref,handler) => {
  return (
    useEffect(()=>{
        const listner=(event)=>{
            if(!ref.current || ref.current.contains(event.target)){
                // console.log(ref.current)
                return
            }  
            handler(event)

        }
        
        document.addEventListener("mousedown", listner);
        document.addEventListener("touchstart", listner);
        return () => {
            document.removeEventListener("mousedown", listner);
            document.removeEventListener("touchstart", listner);
          };

    },[ref,handler])
  )
}

export default useOnClickOutside