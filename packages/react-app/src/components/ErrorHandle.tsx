import React, { Component, ErrorInfo, ReactNode } from 'react';


// export default class StandardErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error: Error) {
//     // Hata durumunda state'i güncelleyin
//     console.log("1");
//     // return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     // Hata hakkında ek işlemler yapabilirsiniz
//     console.error("error");
//     console.error("errorInfo");
//   }

//   render() {
//     if (this.state.hasError) {
//       // Hata durumunda gösterilecek içerik
//     //   return <div>Something went wrong.</div>;
//     console.log("3");
//     }

//     // Hata yoksa normal içeriği render edin
//     return this.props.children;
//   }
// }

import { ErrorBoundary } from "react-error-boundary";
import Home from './Home';

export default function ReactErrorBoundary(props:any) {
    return (
        <ErrorBoundary
            FallbackComponent={Home}
            onError={(error, errorInfo) => {
                // log the error
		console.log("Error caught!");  
		console.error(error);  
		console.error(errorInfo);
		
		// record the error in an APM tool...
            }}
        >
            {props.children}
        </ErrorBoundary>
    );
}