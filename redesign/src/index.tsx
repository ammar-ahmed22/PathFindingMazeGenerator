import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";

const rootElem = document.getElementById("root") ? document.getElementById("root") : null;
if (rootElem){
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  );
}


