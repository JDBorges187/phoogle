// components/Photos/index.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../store/photos";
import { getAlbums } from "../../store/albums"
import AlbumForm from "../Albums/AlbumForm";
import PhotoForm from "./PhotoForm";
import "./PhotoGrid.css"


function PhotoGrid() {
    const photos = useSelector(state => state.photos)
    const albums = useSelector(state => state.albums)
    const [selected, setSelected] = useState([])
    const [showAlbumForm, setShowAlbumForm] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    const onDelete = (id) => {
        console.log(`Delete(${id})`)
    }

    const onselect = (id) => {
        // console.log(`Select(${id})`)
        if (selected.includes(id)) {
            setSelected(selected.filter(e => e != id))
        } else {
            setSelected([...selected, id])
        }
    }

    const onAddToAlbum = async () => {
        const data = await dispatch(getAlbums())
        setShowAlbumForm(true)

    }



    if (!photos) return (
        <h1>Loading...</h1>
    )

    return (
        <div className="main-photos">
            <PhotoForm />
            <h1>Photos</h1>
            <p>{`${selected.length} Photos Selected`}</p>
            {!!selected.length &&
                <button
                    onClick={() => onAddToAlbum()}
                    className="album-btn">Add to Album</button>}
            {showAlbumForm && 
                <AlbumForm 
                albums={albums}
                selected={selected}
                setSelected={setSelected}
                setShowAlbumForm={setShowAlbumForm}
                />}
            <div className="photo-grid">
                {Object.values(photos).map((photo, i) => {
                    return (
                        <div key={i} className="photo-card">
                            <img className={selected.includes(photo.id) ? "selected" : ""}
                                src={photo.photoUrl} />
                            <div className="photo-btns">
                                <button onClick={() => onselect(photo.id)}>Select</button>
                                <button onClick={() => onDelete(photo.id)}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PhotoGrid
