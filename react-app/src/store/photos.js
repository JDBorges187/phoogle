//constants
const LOAD_PHOTOS = "photos/LOAD_PHOTOS"
const ADD_PHOTO = "photos/ADD_PHOTO"
const REMOVE_PHOTO = "photos/REMOVE_PHOTO"

//actions
export const loadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    payload: photos
})

export const addPhoto = (photo) => ({
    type: ADD_PHOTO,
    payload: photo
})

export const removePhoto = (photo) => ({
    type: REMOVE_PHOTO,
    payload: photo
})


//thunks

//READ
export const getPhotos = () => async (dispatch) => {
    const res = await fetch("/api/photos/")
    console.log(res)

    if (res.ok) {
        const photos = await res.json()
        dispatch(loadPhotos(photos))
    }
}

//CREATE
export const uploadPhoto = (photoUrl) => async (dispatch) => {
    const res = await fetch("/api/photos/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            photoUrl,
        })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addPhoto(data))
    }

}

//to fix bug where after upload three empty divs get added to photos
export const afterUpload = (photo) => dispatch => {
    dispatch(addPhoto(photo))
}

//DELETE
export const deletePhoto = (photoId) => async (dispatch) => {
    const res = await fetch("/api/photos/"+photoId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (res.ok) {
        const photo = await res.json()
        dispatch(removePhoto(photo))
    }

}


//initial state

const initialState = {}


//reducer

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case LOAD_PHOTOS:
            return { ...state, ...payload.photos }
        case ADD_PHOTO:
            return { ...state, ...payload.photo }
        case REMOVE_PHOTO:
            const newState = {...state}
            delete newState[payload.photo.id]
            return newState

        default:
            return state
    }
}
