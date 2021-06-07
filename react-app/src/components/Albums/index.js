import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../store/albums";


function AlbumsList() {
    const albums = useSelector(state => state.albums)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(dispatch(getAlbums()))
    }, [dispatch])

    if (!Object.keys(albums).length) return (
        <h1>Loading...</h1>
    )

    return (
        <div>
            <h1>Albums</h1>
            {Object.values(albums).map((album,i)=>{
                return (
                    <div key={i} className="album-cover">{album.name}</div>
                )
            })}
        </div>
    )
}

export default AlbumsList
