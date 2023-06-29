/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { ImUpload2 } from "react-icons/im";
import { MdCancel } from "react-icons/md";

import styled from "./styles.module.scss";
import { Button } from "@mui/material";

const Images = ({ images, setImages }) => {
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  const imageChangeHandler = (e) => {
    // Convert FileList sang Array
    let files = Array.from(e.target.files);

    for (let i = 0; i < files.length; i++) {
      //Chỉ lấy 3 ảnh đầu của mảng nếu up cùng lúc nhiều hơn 3 ảnh
      if (i === 3) {
        setError("Maximum 3 images are allowed.");
        return;
      }

      //Không cho phép up tiếp khi images đã chứa 3 phần tử
      if (
        (images.length === 3 && i === 0) ||
        (images.length === 2 && i === 1) ||
        (images.length === 1 && i === 2)
      ) {
        setError("Maximum 3 images are allowed.");
        return;
      }

      //Logic chỉ cho phép upload jpeg, png, webp
      if (
        files[i].type != "image/png" &&
        files[i].type != "image/webp" &&
        files[i].type != "image/jpeg"
      ) {
        //update files thành mảng chỉ chứa những file hợp lệ
        files = files.filter((item) => item.name !== files[i].name);
        setError(
          `${files[i].name} format is unsupported! Only JPEG, PNG, WEBP are allowed.`
        );
        return;
      } else if (files[i].size > 1024 * 1024 * 5) {
        //update files thành mảng chỉ chứa những file hợp lệ
        files = files.filter((item) => item.name !== files[i].name);
        setError(
          `${files[i].name} size is too large! Only 5MB files are allowed.`
        );
        return;
      } else {
        setError("");
        //Khởi tạo instance reader, reader chứa các tính năng đọc file
        const reader = new FileReader();
        //reader sẽ đọc file và convert sang URL bằng readAsDataURL
        reader.readAsDataURL(files[i]);
        //load event được trigger sau khi file đã được đọc xong
        //Push URL của ảnh vào mảng images
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    }
  };

  //Remove Image
  const removeImageHandler = (img) => {
    setImages((images) => {
      const newImages = images.filter((image) => img !== image);
      return newImages;
    });
    if (images.length <= 3) {
      setError("");
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={imageChangeHandler}
        multiple
        //Giới hạn loại file upload là png, jpeg và webp
        accept="image/png, image/jpeg, image/webp"
      />
      <div className={styled.upload_btn}>
        <Button
          variant="contained"
          className={styled.upload_btn}
          onClick={() => inputRef.current.click()}
          startIcon={<ImUpload2 />}
        >
          Add images
        </Button>
      </div>
      {error && (
        <div className={styled.error}>
          <MdCancel />
          {error}
        </div>
      )}
      <div className={styled.images_wrap}>
        {images.length > 0 &&
          images.map((img, index) => {
            return (
              <span key={index}>
                <MdCancel onClick={() => removeImageHandler(img)} />
                <img src={img} alt="" />
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default Images;
