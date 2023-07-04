import RootNavigation from "../navigation/RootNavigation";
import api, { getCookie } from '../api';
import "../App.css";
import MyNavbar from "./myNavbar";
import { useIsAuthenticated } from 'react-auth-kit';
import { useState } from 'react';
import { useEffect } from "react";
import { ToastProvider } from "./Toast";
import { InviteToast } from "../chat/chatUtils/inviteGame";

const repeatString = (str: string, count: number) => {
	return str.repeat(count);
};

export async function getPP(username: string | undefined) {
	if (getCookie('42_auth_state')) {
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

export async function isBlock(username: any, friendName: any) {
	if (username === friendName)
		return false;
	const response = await api.get(`/block-user/isBlock/${username}/${friendName}`);
	if (response.data.message === 'Is Block')
		return true;
	return false;
}

export default function Main() {
	const [pp, setPP] = useState('');
	useEffect(() => {
		const fetchData = async () => {
			setPP(await getPP(undefined));
		};

		fetchData();
	}, []);

	const isAuthenticated = useIsAuthenticated();
	return (

		<div className="App">
			<InviteToast>
				<ToastProvider>
					{isAuthenticated() && <MyNavbar pp={pp} setPP={setPP} />}
					<RootNavigation pp={pp} setPP={setPP} />
				</ToastProvider>
			</InviteToast>
		</div>
	);
}