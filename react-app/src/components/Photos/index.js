// components/Photos/index.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../store/photos";
import PhotoForm from "./PhotoForm";


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
            <p>{JSON.stringify(photos)}</p>
        </div>
    )
}

export default PhotoGrid
