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
            <div>Album 1</div>
            <div>Album 2</div>
        </div>
    )
}

export default AlbumsList
