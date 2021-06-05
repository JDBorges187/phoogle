//constants
const LOAD_PHOTOS = "photos/LOAD_PHOTOS"
const ADD_PHOTO = "photos/ADD_PHOTO"
//actions
export const loadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    payload: photos
})

export const addPhoto = (photo) => ({
    type: ADD_PHOTO,
    payload: photo
})



//thunks
export const getPhotos = () => async (dispatch) => {
    const res = await fetch("/api/photos/")
    console.log(res)

    if (res.ok) {
        const photos = await res.json()
        dispatch(loadPhotos(photos))
    }
}

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


//initial state

const initialState = {}


//reducer

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case LOAD_PHOTOS:
            return { ...state, ...payload.photos }
        case ADD_PHOTO:
            return { ...state, ...payload.photo }

        default:
            return state
    }
}
