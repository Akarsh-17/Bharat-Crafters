// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"

// export default function StringField({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   getValues,
//   placeholder
// }) {
//   const { editProduct, product } = useSelector((state) => state.product)
//   const [feature, setFeature] = useState("")
//   const [featuresList, setFeaturesList] = useState(["helo"])
//   const [list,setList]=useState()
//   useEffect(() => {
//     if (editProduct) {
//       setList(product?.[name])
//     }
//     register(name, { required: true, validate: (value) => value.length > 0 })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   useEffect(() => {
//     setValue(name, list)
//     console.log(list)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [list])

//   const handleAddRequirement = () => {
//     if (feature) {
//       console.log(feature)
//       setList([...list, feature])
//       setFeature("")
//     }
//   }

//   // const handleAddRequirement = () => {
//   //   if (feature) {
//   //     console.log(featuresList)
//   //     setFeaturesList(prev=>console.log(prev));
//   //     setFeaturesList(prev=>console.log(prev));
//   //     setFeaturesList(prev => [...prev, feature]);
//   //     setFeature("");
//   //   }
//   // };

//   const handleRemoveRequirement = (index) => {
//     const updatedRequirements = [...featuresList]
//     updatedRequirements.splice(index, 1)
//     setFeaturesList(updatedRequirements)
//   }

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-sm " htmlFor={name}>
//         {label} <sup className="text-pink-200">*</sup>
//       </label>
//       <div className="flex items-start space-x-2">
//         <input
//           type="text"
//           id={name}
//           value={feature}
//           placeholder={placeholder}
//           onChange={(e) => setFeature(e.target.value)}
//           className="form-style w-full"
//         />
//         <button
//           type="button"
//           onClick={handleAddRequirement}
//           className=" text-lg text-amber-500"
//         >
//           Add
//         </button>
//       </div>
//       {list?.length > 0 && (
//         <ul className="mt-2 list-inside list-disc">
//           {list.map((feature, index) => (
//             <li key={index} className="flex items-center text-richblack-700">
//               <span>{feature}</span>
//               <button
//                 type="button"
//                 className="ml-2 text-xs text-orange-500 "
//                 onClick={() => handleRemoveRequirement(index)}
//               >
//                 clear
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }



import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function StringField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editProduct, product } = useSelector((state) => state.product)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editProduct) {
      setRequirementsList(product[name])
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm " htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex items-start space-x-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="text-lg text-amber-500"
        >
          Add
        </button>
      </div>
      {requirementsList?.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-700">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-orange-500 "
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
