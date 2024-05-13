import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function ColorField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
  placeholder,
  id
}) {
  const { editProduct, product } = useSelector((state) => state.product)
  const [feature, setFeature] = useState("")
  const [featuresList, setFeaturesList] = useState([])

  useEffect(() => {
    if (editProduct) {
      setFeaturesList(product?.[name])
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, featuresList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featuresList])

  const handleAddRequirement = () => {
    if (feature) {
      setFeaturesList([...featuresList, feature])
      setFeature("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...featuresList]
    updatedRequirements.splice(index, 1)
    setFeaturesList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm " htmlFor={id}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex items-start space-x-2">
        <input
          type="text"
          id={id}
          value={feature}
          placeholder={placeholder}
          onChange={(e) => setFeature(e.target.value)}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className=" text-lg text-amber-500"
        >
          Add
        </button>
      </div>
      {featuresList?.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {featuresList.map((feature, index) => (
            <li key={index} className="flex items-center text-richblack-700">
              <span>{feature}</span>
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
      {errors.options && errors[name] (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
