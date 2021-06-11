//constants
const LOAD_ALBUMS = "albums/LOAD_ALBUMS"
const ADD_ALBUM = "albums/ADD_ALBUM"


//actions
export const loadAlbums = (albums) => ({
    type: LOAD_ALBUMS,
    payload: albums
})

export const addAlbum = (album) => ({
    type: ADD_ALBUM,
    payload: album
})



//thunks
export const getAlbums = () => async(dispatch) => {
    const res = await fetch("/api/albums/")

    if (res.ok) {
        const albums = await res.json()
        dispatch(loadAlbums(albums))
        return albums
    }
}

export const createAlbum = (name, photos) => async(dispatch) => {
    const res = await fetch("/api/albums/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            photos,
        })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addAlbum(data))
    }
}

export const updateAlbum = ({albumId, addPhotos, removePhotos}) => async(dispatch) => {
    const res = await fetch("/api/albums/"+albumId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            addPhotos,
            removePhotos
        })
    })
}

//initial state

const initialState = {}


//reducer

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case LOAD_ALBUMS:
            return {...state, ...payload.albums }
        case ADD_ALBUM:
            return {...state, ...payload.album }

        default:
            return state
    }
}