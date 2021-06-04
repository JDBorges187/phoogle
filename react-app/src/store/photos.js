//constants
const LOAD_PHOTOS = "photos/LOAD_PHOTOS"

//actions
export const loadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    payload: photos
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

        if (data.errors){
            dispatch(loadPhotos(data))
            return data
        }

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
