import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import InputField from "@/components/InputField";
import ImageThumbnails from "@/components/ImageThumbnails";
import LoginButton from "@/components/LoginButton";
import withAuth from "@/HOC/withAuth";
import { carSubmit } from "@/services/networkRequests";

const SubmissionPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [carModel, setCarModel] = useState("");
  const [carModelError, setCarModelError] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [city, setCity] = useState("");
  const [numberOfPictures, setNumberOfPictures] = useState("");
  const [numberOfPicturesError, setNumberOfPicturesError] = useState("");
  //   const [images, setImages] = useState<Array<string>>([]);
  //   const [pictures, setPictures] = useState<FileList | null>(null);
  const [pictures, setPictures] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [error, setError] = useState<string>("");

  const validateCarModel = () => {
    if (carModel.length < 3) {
      setCarModelError("Car model must be at least 3 characters long");
    } else {
      setCarModelError("");
    }
  };

  const validatePrice = () => {
    if (isNaN(Number(price)) || Number(price) <= 0) {
      setPriceError("Price must be a positive number");
    } else {
      setPriceError("");
    }
  };

  const validatePhoneNumber = () => {
    if (!/^\d{11}$/.test(phoneNumber)) {
      setPhoneNumberError("Phone number must be exactly 11 digits");
    } else {
      setPhoneNumberError("");
    }
  };

  const validateNumberOfPictures = () => {
    const numberOfPicturesInt = parseInt(numberOfPictures);
    console.log("numberOfPicturesInt", numberOfPicturesInt);
    console.log("pictures.length", pictures.length);
    if (!pictures.length) {
      setFileError("Please select pictures");
    } else if (
      isNaN(numberOfPicturesInt) ||
      numberOfPicturesInt < 1 ||
      numberOfPicturesInt > 10
    ) {
      setNumberOfPicturesError("Number of pictures must be between 1 and 10");
    } else if (pictures.length > numberOfPicturesInt) {
      console.log("+++++++++++++++++++++");
      setFileError("Number of selected pictures does not match");
    } else {
      setFileError("");
      setNumberOfPicturesError("");
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    validateCarModel();
    validatePrice();
    validatePhoneNumber();
    validateNumberOfPictures();

    // If all fields are valid, submit the form
    if (
      !carModelError &&
      !priceError &&
      !phoneNumberError &&
      !numberOfPicturesError &&
      !fileError
    ) {
      setError("");
      const formData = new FormData();
      formData.append("carModel", carModel);
      formData.append("price", price);
      formData.append("phoneNumber", phoneNumber);
      formData.append("city", city);
      for (let i = 0; i < pictures.length; i++) {
        formData.append("pictures", pictures[i]);
      }
      console.log("formdata", formData);
      try {
        const response = await carSubmit(formData);
        console.log("response", response);
        if (response.hasOwnProperty("_id")) {
          setSuccess("Form Submitted Successfully");
          setCarModel("");
          setCity("");
          setPrice("");
          setNumberOfPictures("");
          setPhoneNumber("");
          setError("");
        }
      } catch (error: any) {
        setError(error.message || "Failed to submit. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError("Please fix all errors");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    // console.log(e.target.)
    if (!numberOfPictures) {
      setFileError("First select number of pictures");

      e.target.value = "";
      return;
    }
    if (selectedFiles && selectedFiles.length > 0) {
      setPictures(Array.from(selectedFiles));
      if (selectedFiles.length > parseInt(numberOfPictures)) {
        setFileError("Number of selected pictures does not match");
      } else {
        setFileError("");
      }
    }
  };

  useEffect(() => {
    console.log("pictures", pictures);
    if (fileError) {
      validateNumberOfPictures();
    }
  }, [pictures]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Submit Vehicle Information
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <InputField
          label="Car Model"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          error={!!carModelError}
          helperText={carModelError}
          marginBottom={1}
          required
        />
        <InputField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={!!priceError}
          helperText={priceError}
          marginBottom={1}
          required
          type="number"
        />
        <InputField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={!!phoneNumberError}
          helperText={phoneNumberError}
          marginBottom={1}
          required
          type="tel"
        />
        <InputField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          marginBottom={1}
          required
        />
        <InputField
          label="Number of Pictures"
          value={numberOfPictures}
          onChange={(e) => setNumberOfPictures(e.target.value)}
          error={!!numberOfPicturesError}
          helperText={numberOfPicturesError}
          marginBottom={1}
          required
          type="number"
        />
        <Box mb={1}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <ImageThumbnails images={pictures} setImages={setPictures} />
        </Box>
        {fileError && <Typography color="error">{fileError}</Typography>}
        <LoginButton loading={loading} onClick={handleSubmit} label="Submit" />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
      </form>
    </Container>
  );
};

export default withAuth(SubmissionPage);
