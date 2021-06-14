import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updateAlbum, createAlbum } from "../../store/albums"


const AlbumForm = ({
  albums,
  selected,
  setSelected,
  setShowAlbumForm }) => {
  const [errors, setErrors] = useState([]);
  const [albumId, setAlbumId] = useState(-1)
  const [albumName, setAlbumName] = useState("");
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onAlbumCreate = async (e) => {
    e.preventDefault();
    if (!albumName) {
      dispatch(updateAlbum({ albumId, addPhotos: selected}))
      // console.log("added to " + albums[albumId])
    } else {
      dispatch(createAlbum(albumName, selected))
      history.push('/albums')
      // console.log("created " + albumName)
    }
    setAlbumName('')
    setSelected([])
    setShowAlbumForm(false)
    // const data = await dispatch(uploadPhoto(albumName));
    // if (data.errors) {
    //   setErrors(data.errors);
    // }
  };

  const updateAlbumName = (e) => {
    setAlbumName(e.target.value);
  };

  const handleAlbumId = (e) => {
    setAlbumId(e.target.value)
  }

  return (
    <form onSubmit={onAlbumCreate}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="albumId">Add To</label>
        <select name="albumId" value={albumId} onChange={handleAlbumId}>
          <option key="-1" default value={-1}>Select an Album</option>
          <option key="0" value={0}>Create New Album</option>
          {!!Object.keys(albums).length &&
            Object.values(albums).map(album => {
              return (
                <option key={album.id}
                  value={album.id}
                >{album.name}</option>
              )
            })}
        </select>
      </div>
      {albumId == 0 &&
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
      }
      <button type="submit">Add</button>
    </form>
  );
};

export default AlbumForm;
