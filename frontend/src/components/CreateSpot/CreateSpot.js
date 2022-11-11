import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { createSpot } from "../../store/spot"
import { useHistory } from "react-router-dom"
import { createSpotThunk } from "../../store/spot"
import './createSpot.css'

export default function CreateSpot({setShowModal}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('')
    const [errors, setErrors] = useState([]);
    // const spot = useSelector(state => state.spot)
    const sessUser = useSelector(state => state.session.user)


    useEffect(()=>{
      const errors = []
      if(!sessUser) errors.push("Must be logged in to Host a spot")
      if(!address) errors.push("Street address is required")
      if(!city) errors.push("City is required")
      if(!state) errors.push("State is required")
      if(!country) errors.push("Country is required")
      if(name.length > 50) errors.push("Name must be less than 50 characters")
      if(!description) errors.push("Description is required")
      if(price < 0 || !price) errors.push("Price per day is required")


      setErrors(errors)
    },[price,country, address, city, state, country, name, description, sessUser])

    const handleSubmit = async (e) => {
        e.preventDefault();


        const payload = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            previewImage
        };

        let newSpot = await dispatch(createSpotThunk(payload))
        if (newSpot) {
          setShowModal(false)
        }


    }

    return (
      <>
      <ul>
      {errors.map((error) => (
        <li key={error}> {error}</li>))}
      </ul>
  <div className="fullSpotForm">
    <h2>Add a Spot</h2>
     <form onSubmit={handleSubmit}>
      <div className="formInputs">
      <div className="oneFormInput">
     <label>
        Address
        <div className="formPadding">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        </div>
     </label>
      </div>
     <div className="oneFormInput">
     <label>
        City
        <div className="formPadding">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        </div>
        </label>
        </div>
        <div className="oneFormInput">
        <label>
        State
        <div className="formPadding">
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        </div>
        </label>
        </div>
        <div className="oneFormInput">
        <label>
        Country
        <div className="formPadding">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        </div>
        </label>
        </div>
        <div className="oneFormInput">
        <label>
        Name
        <div className="formPadding">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        </div>
        </label>
        </div>
        <div className="oneFormInput">
        Description
        <div className="formPadding">
        <textarea className="textAreaInput"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        </div>
        </div>
        <div className="oneFormInput">
        <label>
        Price
        <div className="formPadding">
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        </div>
        </label>
        </div>
        <div className="oneFormInput">
        <label>
        Preview Image
        <div className="formPadding">
        <input
          type="text"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          required
        />
        </div>
        </label>
        </div>
        </div>
        <button className="spotSubmitButton" type='submit'>Submit</button>
      </form>
    </div>
    </>
    )
}