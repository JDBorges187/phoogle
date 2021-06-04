import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {uploadPhoto} from '../../store/photos'


const PhotoForm = () => {
  const [errors, setErrors] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("");
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onUpload = async (e) => {
    e.preventDefault();
    const data = await dispatch(uploadPhoto(photoUrl));
    // if (data.errors) {
    //   setErrors(data.errors);
    // }
  };

  const updatePhoto = (e) => {
    setPhotoUrl(e.target.value);
  };

  return (
    <form onSubmit={onUpload}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="photoUrl">Photo</label>
        <input
          name="photoUrl"
          type="text"
          placeholder="Photo Url"
          value={photoUrl}
          onChange={updatePhoto}
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default PhotoForm;
