import React from 'react';
import './App.css';
import { Routes, Route, Router } from "react-router-dom";
import Login from "./compoments/Login";
import { ChakraProvider } from "@chakra-ui/react";
import FetchRatings from "./compoments/Rating";
import ProtectedRoutes from "./compoments/protectedRoutes";
import DateTable from "./compoments/DateTable";
import NavBar from "./compoments/NavBar";
import history from "./history";
import NotFound from "./compoments/animationsCompoments/NotFound";

function App() {
  return (
    <Router navigator={history} location={history.location}>
      <ChakraProvider>
        <NavBar />

        <Routes >
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/rating" element={<FetchRatings />} />
            <Route path="/dateTable" element={<DateTable />} />
          </Route>
        </Routes>
      </ChakraProvider>

    </Router>
  );
}

export default App;
