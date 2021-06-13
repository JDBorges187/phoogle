// components/Photos/index.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getPhotos,
    deletePhoto,
    getAlbumPhotos,
    removeAllPhotos
} from "../../store/photos";
import { getAlbums } from "../../store/albums"
import AlbumForm from "../Albums/AlbumForm";
import PhotoForm from "./PhotoForm";
import "./PhotoGrid.css"
import PhotoUpload from "./PhotoUpload";
import { useLocation, useParams } from "react-router";


function PhotoGrid() {
    const { albumId } = useParams()
    const photos = useSelector(state => state.photos)
    const albums = useSelector(state => state.albums)

let album
    if (albums && albumId) {
        album = albums[albumId]
    }
    const [selected, setSelected] = useState([])
    const [showAlbumForm, setShowAlbumForm] = useState(false)
    const [displayOne, setDisplayOne] = useState(null)
    const dispatch = useDispatch()

    const location = useLocation()
    const pathname = location.pathname
    // console.log(albumId)

    useEffect(() => {
        document.addEventListener('keydown', (e)=>{
            if (e.key==='Escape') setDisplayOne(null)
        })
        return () => {
            document.removeEventListener('keydown',(e)=>{
                if (e.key==='Escape') setDisplayOne(null)
            })
    //         dispatch(removeAllPhotos())
        }
    }, [])

    useEffect(() => {
        if (pathname === '/') {
            dispatch(getPhotos())
        } else {
            dispatch(getAlbumPhotos(albumId))
            dispatch(getAlbums())
        }
        // return () => {
        //     dispatch(removeAllPhotos())
        // }

    }, [dispatch,pathname])

    const onDelete = async (id) => {
        await dispatch(deletePhoto(id))
        if (selected.includes(id)) {
            setSelected(selected.filter(e => e !== id))
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

    const onFullScreen = (id) => {
        setDisplayOne(id)
    }

    const onAddToAlbum = async () => {
        const data = await dispatch(getAlbums())
        setShowAlbumForm(true)

    }

    const onRemoveFromAlbum = async () => {

    }


    if (!photos) return (
        <h1>Loading...</h1>
    )

    return (
        <div className="main-photos">
            {false && <PhotoForm />}
            {!albumId && <PhotoUpload />}
            <h1>{location.pathname === '/' 
                ? "Photos" 
                : !album 
                    ? null
                    : album.name}</h1>
            {!!selected.length &&
                <>
                    <p>{`${selected.length} Photos Selected`}</p>
                    {!albumId ? (<button
                        onClick={() => onAddToAlbum()}
                        className="album-btn">Add to Album</button>) : (
                        <button
                            onClick={() => onRemoveFromAlbum()}
                            className="album-btn">Remove from Album</button>
                    )}
                </>}
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
                        <div key={photo.id}  className="photo-card">
                            <img onClick={()=>onFullScreen(photo.id)}
                                className={[(displayOne === photo.id?"fullscreen":""), 
                                    (selected.includes(photo.id) ? "selected" : "")].join(" ")}
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
