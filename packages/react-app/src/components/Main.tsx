import RootNavigation from "../navigation/RootNavigation";
import api from '../api';
import "../App.css";
import MyNavbar from "./myNavbar";
import Footer from "./Footer";
import { useIsAuthenticated } from 'react-auth-kit';
import { useState } from 'react';
import { useEffect } from "react";

export async function getPP() {
  const pp = await api.get('upload-avatar/get-image', { responseType: 'blob' })
    .then((response:any) => {
      if (response.status === 200) {
        const imgBlob = new Blob([response.data], { type: 'image/jpeg' });
        const imgURL = URL.createObjectURL(imgBlob);
        return imgURL;
      } else {
        return "pps/default.png";
      }
    })
    .catch(() => { return "pps/default.png"; });

  return pp;
}

export default function Main() {


  const [pp, setPP] = useState("pps/default.png");

  useEffect(() => {
    const fetchData = async () => {
      setPP(await getPP());
    };

    fetchData();
  }, []);

  const isAuthenticated = useIsAuthenticated();
  return (

    <>
      {isAuthenticated() && <MyNavbar pp={pp} setPP={setPP} />}
      <RootNavigation pp={pp} setPP={setPP} />
    </>
  );
}