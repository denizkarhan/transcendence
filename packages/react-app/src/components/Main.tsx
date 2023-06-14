import RootNavigation from "../navigation/RootNavigation";
import api, { getCookie } from '../api';
import "../App.css";
import MyNavbar from "./myNavbar";
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useState } from 'react';
import { useEffect } from "react";

const repeatString = (str: string, count: number) => {
  return str.repeat(count);
};

export async function getPP(username: string | undefined) {
  if (await getCookie('42_auth_state')) {
    let response;
    if (username !== undefined)
      response = await api.get(`upload-avatar/get-image/${username}`, { responseType: 'blob' })
    else
      response = await api.get(`upload-avatar/get-image`, { responseType: 'blob' })
    if (response.status === 200) {
      const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
      const imgURL = URL.createObjectURL(imageBlob);
      return imgURL;
    }
  }
  const path = window.location.pathname.split('/');
  const endPoint = repeatString('../', path.length - 2);
  return endPoint + "pps/default.png";
}

export function getUserName(){
	const auth = useAuthUser();
	const user = auth()?.username ?? "User";
	return user;
}


export default function Main() {
  const [pp, setPP] = useState("pps/default.png");
  useEffect(() => {
    const fetchData = async () => {
      setPP(await getPP(undefined));
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