import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface ToastContextType {
	showError: (errorMessage: any) => void;
	showSuccess: (successMessage: any) => void;
}
interface ToastProviderProps {
	children: React.ReactNode;
}


export const ToastContext = createContext<ToastContextType>({
	showError: () => { },
	showSuccess: () => { },
});

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
	const showError = (errorMessage: string) => {
		toast.error(errorMessage);
	};

	const showSuccess = (successMessage: string) => {
		toast.success(successMessage);
	};

	return (
		<ToastContext.Provider value={{ showError, showSuccess }}>
			<ToastContainer />
			{children}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	return useContext(ToastContext);
};