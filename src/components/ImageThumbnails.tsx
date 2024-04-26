import React, { useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
type ImageThumbnailProps = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
};

const ImageThumbnails: React.FC<ImageThumbnailProps> = ({
  images,
  setImages,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const renderThumbnail = (image: File) => {
    const imageUrl = URL.createObjectURL(image);
    return (
      <div key={image.name} style={{ margin: "10px", position: "relative" }}>
        <img
          src={imageUrl}
          alt={image.name}
          style={{ width: "100px", height: "100px" }}
          onLoad={() => URL.revokeObjectURL(imageUrl)}
        />
        <IconButton
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => handleDelete(image)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };
  const handleDelete = (imageToDelete: File) => {
    console.log('inside handle delete')
    setImages(images.filter((image) => image !== imageToDelete));
    URL.revokeObjectURL(imageToDelete.name);

    // Clear the file input value for the deleted file
    if (fileInputRef.current) {
      const files = fileInputRef.current.files;
      if (files) {
        const fileIndex = Array.from(files).findIndex(
          (file) => file === imageToDelete
        );
        if (fileIndex !== -1) {
          const remainingFiles = Array.from(files);
          remainingFiles.splice(fileIndex, 1); // Remove the file at fileIndex

          // Create a new FileList using DataTransfer
          const dataTransfer = new DataTransfer();
          remainingFiles.forEach((file) => {
            dataTransfer.items.add(file);
          });

          // Assign the new FileList to the file input element
          fileInputRef.current.files = dataTransfer.files;
        }
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {images.map(renderThumbnail)}
    </div>
  );
};

export default ImageThumbnails;
