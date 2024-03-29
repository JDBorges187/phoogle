import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux'

import {afterUpload} from "../../store/photos"


const PhotoUpload = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch()
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", image);
        
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/photos/', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const photo = await res.json();
            setImageLoading(false);
            dispatch(afterUpload(photo))
            history.push("/");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }
    
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default PhotoUpload;