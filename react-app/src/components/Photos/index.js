// components/Photos/index.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../store/photos";
import PhotoForm from "./PhotoForm";
import "./PhotoGrid.css"


function PhotoGrid() {
    const photos = useSelector(state => state.photos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    if (!photos) return (
        <h1>Loading...</h1>
    )

    return (
        <div className="main-photos">
            <PhotoForm />
            <h1>Photos</h1>
            <div className="photo-grid">
                {Object.values(photos).map((photo, i) => {
                    return (
                        <img key={i} src={photo.photoUrl} />
                    )
                })}
            </div>
        </div>
    )
}

export default PhotoGrid
