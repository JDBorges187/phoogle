import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../store/albums";
import "./Albums.css"


function AlbumsList() {
    const albums = useSelector(state => state.albums)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(dispatch(getAlbums()))
    }, [dispatch])

    if (!Object.keys(albums).length) return (
        <h1>Albums</h1>
    )

    return (
        <div className="albums-main">
            <h1>Albums</h1>
            <div className="album-cards">
                {Object.values(albums).map((album, i) => {
                    return (
                        <div key={i}
                            style={{ backgroundImage: `url(${album.coverPhoto.photoUrl})` }}
                            className="album-cover">{album.name}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default AlbumsList
