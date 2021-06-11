// components/Photos/index.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos, deletePhoto, getAlbumPhotos } from "../../store/photos";
import { getAlbums} from "../../store/albums"
import AlbumForm from "../Albums/AlbumForm";
import PhotoForm from "./PhotoForm";
import "./PhotoGrid.css"
import PhotoUpload from "./PhotoUpload";
import { useLocation, useParams } from "react-router";


function PhotoGrid() {
    const {albumId} = useParams()
    const photos = useSelector(state => state.photos)
    const albums = useSelector(state => state.albums)
    const [selected, setSelected] = useState([])
    const [showAlbumForm, setShowAlbumForm] = useState(false)
    const dispatch = useDispatch()

    const location = useLocation()
    console.log(albumId)

    useEffect(() => {
        if (location.pathname==='/'){
            dispatch(getPhotos())
        } else{
            dispatch(getAlbumPhotos())
        }
    }, [dispatch])

    const onDelete = async (id) => {
        await dispatch(deletePhoto(id))
        if (selected.includes(id)) {
            setSelected(selected.filter(e=>e!==id))
        }
        // console.log(`Delete(${id})`)
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
            {false && <PhotoForm />}
            <PhotoUpload />
            <h1>{location.pathname === '/' ? "Photos" : location.pathname.split('/')[1]}</h1>
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
