import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const AlbumForm = () => {
  const [errors, setErrors] = useState([]);
  const [albumName, setAlbumName] = useState("");
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onAlbumCreate = async (e) => {
    e.preventDefault();
    // const data = await dispatch(uploadPhoto(albumName));
    // if (data.errors) {
    //   setErrors(data.errors);
    // }
  };

  const updateAlbumName = (e) => {
    setAlbumName(e.target.value);
  }; 

  return (
    <form onSubmit={onAlbumCreate}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="albumName">Album Name</label>
        <input
          name="albumName"
          type="text"
          placeholder="Album Name"
          value={albumName}
          onChange={updateAlbumName}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default AlbumForm;
