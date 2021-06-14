import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
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
        <div className="main-content">
            <h1>Albums</h1>
            <div className="albums-holder">
                {Object.values(albums).map((album, i) => {
                    return (
                        <Link key={i} to={`/albums/${album.id}`}
                            style={{ backgroundImage: `url(${album.coverPhoto.photoUrl})` }}
                            className="album-cover">
                            <div className="album-title">
                                {album.name}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default AlbumsList
