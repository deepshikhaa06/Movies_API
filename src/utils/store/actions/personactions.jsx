import axios from "../../axios";
import { loadperson} from "../reducers/personSlice"

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    const changes = await axios.get(`/person/${id}/changes`);
    const images = await axios.get(`/person/${id}/images`);
    const latest = await axios.get(`/person/latest`);


    
    let theultimate = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
      changes: changes.data,
      images: images.data,
      latest: latest.data
    };
    dispatch(loadperson(theultimate));
    console.log("theultimate", theultimate);
  } catch (e) {
    console.log(e);
  }
};
