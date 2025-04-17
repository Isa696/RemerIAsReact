import { useRef } from "react";
import imageCompression from "browser-image-compression";
import { X } from "phosphor-react";
// import "./ImageInputList.css";

const compressAndConvertToBase64 = async (file) => {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    fileType: "image/webp",
  };

  const compressed = await imageCompression(file, options);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(compressed);
  });
};

export default function ImageInputList({ images, setImages }) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (index, file) => {
    if (!file) return;
    try {
      const base64 = await compressAndConvertToBase64(file);
      const updated = [...images];
      updated[index] = base64;
      setImages(updated);
    } catch (err) {
      console.error("Error al procesar imagen:", err);
    }
  };

  const addNewImage = () => setImages([...images, ""]);

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  return (
    <div className="images-container">
      {images.map((img, index) => (
        <div key={index} className="image-input-group">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(index, e.target.files[0])}
          />
          {images.length > 1 && (
            <button
              type="button"
              className="remove-image-btn"
              onClick={() => removeImage(index)}
            >
              <X size={16} />
            </button>
          )}
          {img && <img src={img} alt={`Preview ${index + 1}`} className="image-preview" />}
        </div>
      ))}
      <button type="button" className="add-image-btn" onClick={addNewImage}>
        + Agregar otra imagen
      </button>
    </div>
  );
}
