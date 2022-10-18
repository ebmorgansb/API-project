import {useDispatch, useSelector} from 'react-redux'





const DELETE = 'books/deleteSingleSpot'
const CREATE = 'spots/createNewSpot'
const RECEIVE = 'spots/getAllSpots'

export const receiveSpots = (spots) => {
  return {
    type: RECEIVE,
    spots,
  };
};


<<<<<<< HEAD
export const actionDeleteSpot = (id) => ({
  type: DELETE,
  id
})

export const actionCreateSpot = (spot) => ({
  type: CREATE,
  spot
})
=======
export const actionDeleteSpot = (id) => {
  return {
  type: DELETE,
  id
}
}
export const actionCreateSpot = (spot) => {
  return {
  type: CREATE,
  spot
}}
>>>>>>> main

//Thunk goes here to grab spots data from db, then it
//gets normalized and pushed to reducer
export const fetchSpots = () => async (dispatch) => {
  const res = await fetch(`/api/spots`);
<<<<<<< HEAD
  if (res.ok) {
    const data = await res.json();
    console.log(data)
    dispatch(receiveSpots(data.spots));
  }
=======
  // if (res.ok) {
    const data = await res.json();
    // console.log(data)
    dispatch(receiveSpots(data.Spots));
  // }
>>>>>>> main
};


// function normalize(state) {
//     const normalState = {}
//     spots.forEach(spot => {
//         state[spot.id] = spot
//     })
//     return normalState
// }


export default function spotsReducer(state = {}, action){
  const newState = {...state}

  switch(action.type){
    case CREATE:
      newState[action.spots.id] = action.spot
      //this is dispatched from the create spot component, as the object with the type and actual spot object
      return newState
    case DELETE:
      delete newState[action.spots.id]
      return newState
<<<<<<< HEAD
=======
      case RECEIVE:
        const testState = {...newState, ...action.spots}
        return testState
>>>>>>> main
    default:
      return state
  }
}