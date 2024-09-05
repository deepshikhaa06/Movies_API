import axios from "../../axios";
import { loadmovie } from "../reducers/MovieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
    let theultimate = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      translations: translations.data.translations.map((t)=>t.name),
      similar: similar.data.results,
      videos: videos.data.results,
      // watchproviders: watchproviders.data.results.AU ||watchproviders.data.results.IN,
      // watchproviders: watchproviders.data.results,
      watchproviders: watchproviders.data.results.AR || watchproviders.data.results.AT || watchproviders.data.results.AU || watchproviders.data.results.AZ || watchproviders.data.results.BE || watchproviders.data.results.BG || watchproviders.data.results.BO || watchproviders.data.results.BR || watchproviders.data.results.BZ || watchproviders.data.results.CA || watchproviders.data.results.CH || watchproviders.data.results.CL || watchproviders.data.results.CO || watchproviders.data.results.CR || watchproviders.data.results.CY || watchproviders.data.results.CZ || watchproviders.data.results.DE || watchproviders.data.results.DK || watchproviders.data.results.EC || watchproviders.data.results.EE || watchproviders.data.results.EG || watchproviders.data.results.ES || watchproviders.data.results.FI || watchproviders.data.results.FR || watchproviders.data.results.GB || watchproviders.data.results.GR || watchproviders.data.results.GT || watchproviders.data.results.HK || watchproviders.data.results.HN || watchproviders.data.results.HU || watchproviders.data.results.ID || watchproviders.data.results.IE || watchproviders.data.results.IL || watchproviders.data.results.IN || watchproviders.data.results.IS || watchproviders.data.results.JP || watchproviders.data.results.KR || watchproviders.data.results.LT || watchproviders.data.results.LU || watchproviders.data.results.LV || watchproviders.data.results.MX || watchproviders.data.results.MY || watchproviders.data.results.NI || watchproviders.data.results.NL || watchproviders.data.results.NO || watchproviders.data.results.NZ || watchproviders.data.results.PE || watchproviders.data.results.PH || watchproviders.data.results.PL || watchproviders.data.results.PT || watchproviders.data.results.PY || watchproviders.data.results.SA || watchproviders.data.results.SE || watchproviders.data.results.SG || watchproviders.data.results.SI || watchproviders.data.results.SK || watchproviders.data.results.TH || watchproviders.data.results.TW || watchproviders.data.results.UA || watchproviders.data.results.US || watchproviders.data.results.VE

    };
    dispatch(loadmovie(theultimate));
    console.log("theultimate", theultimate);
  } catch (e) {
    console.log(e);
  }
};
