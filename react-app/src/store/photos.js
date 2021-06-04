//constants
const LOAD_PHOTOS = "photos/LOAD_PHOTOS"

//actions
export const loadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    payload: photos
})



//thunks
export const getPhotos = () => async (dispatch) => {
    const res = await fetch("/api/photos")

    if (res.ok) {
        const photos = await res.json()
        dispatch(loadPhotos(photos))
    }
}

//initial state

const initialState = {
    list: null
}


//reducer

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case LOAD_PHOTOS:
            return { ...state, list: [...payload.photos] }

        default:
            return state
    }
}
