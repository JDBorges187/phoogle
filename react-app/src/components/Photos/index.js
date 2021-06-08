// components/Photos/index.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../store/photos";
import PhotoForm from "./PhotoForm";
import "./PhotoGrid.css"


function PhotoGrid() {
    const photos = useSelector(state => state.photos)
    const [selected, setSelected] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    const onDelete = (id) => {

        console.log(`Delete(${id})`)
    }

    const onselect = (id) => {
        console.log(`Select(${id})`)
        setSelected([...selected, id])
    }

    if (!photos) return (
        <h1>Loading...</h1>
    )

    return (
        <div className="main-photos">
            <PhotoForm />
            <h1>Photos</h1>
            <p>{`${selected.length} Photos Selected`}</p>
            <div className="photo-grid">
                {Object.values(photos).map((photo, i) => {
                    return (
                        <div key={i} className="photo-card">
                            <img src={photo.photoUrl} />
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
