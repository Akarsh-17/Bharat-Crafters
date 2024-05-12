import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  viewData = null,
  editData = null,
}) {
  const { product } = useSelector((state) => state.product);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewSources, setPreviewSources] = useState(
    viewData ? viewData : editData ? editData : []
  );
  const inputRef = useRef(null);

  const onDrop = async (acceptedFiles) => {
    const files = acceptedFiles.slice(0, 4); // Limit to 4 files
    const filteredFiles = [];
    for (let file of files) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      if (img.width === 640 && img.height === 640 && file.size <= 300000) {
        filteredFiles.push(file);
      } else {
        toast.error(
          `File '${file.name}' does not meet the criteria (640x640 resolution or size less than 300kb).`
        );
      }
    }
    setSelectedFiles([...selectedFiles, ...filteredFiles]);
    previewFiles(filteredFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/jpg, image/png",
    onDrop,
    multiple: true, // Allow multiple file selection
    maxSize: 300000, // 300kb in bytes
    disabled: selectedFiles.length >= 4
  });

  const previewFiles = (files) => {
    const newPreviewSources = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        newPreviewSources.push(reader.result);
        if (newPreviewSources.length === files.length) {
          setPreviewSources([...previewSources, ...newPreviewSources]);
        }
      };
    });
  };

  useEffect(() => {
    register(name, { required: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiles, setValue]);

  const removeFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    const updatedPreviews = [...previewSources];
    updatedPreviews.splice(index, 1);
    setPreviewSources(updatedPreviews);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
        {...getRootProps()}
      >
        {previewSources.length > 0 ? (
          <div className="flex w-full flex-col p-6">
            {previewSources.map((previewSource, index) => (
              <div key={index} className="relative">
                <img
                  src={previewSource}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
                {!viewData && (
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSources([]);
                  setSelectedFiles([]);
                  setValue(name, []);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <>
            {selectedFiles.length < 4 && (
              <div className="flex w-full flex-col items-center p-6">
                <input {...getInputProps()} ref={inputRef} />
                <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                  <FiUploadCloud className="text-2xl text-yellow-50" />
                </div>
                <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                  Drag and drop images, or click to{" "}
                  <span className="font-semibold text-yellow-50">Browse</span>{" "}
                  files
                </p>
                <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
                  <li>Multiple file selection allowed</li>
                  <li>Maximum 4 files</li>
                  <li>Size limit: 300kb</li>
                  <li>Width: 640px</li>
                  <li>Height: 640px</li>
                </ul>
              </div>
            )}
            {selectedFiles.length >= 4 && (
              <div className="flex items-center justify-center">
                {toast.error("max 4 photo to be uploaded")}
              </div>
            )}
          </>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
