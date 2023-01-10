import React from 'react';
import {  Routes, Route} from "react-router-dom";
import Login from "./components/Login.js";
import Sign from "./components/Sign.js";
import UserPage from "./components/UserPage.js";
import Events from "./components/Events.js";
import Settings from "./components/Settings.js";
import ShowEvents from "./components/ShowEvents.js";
import Scifi from "./components/Scifi.js";
import History from "./components/History.js";
import Romance from "./components/Romance.js";
import Drama from "./components/Drama.js";
import Adventure from "./components/Adventure.js";
import Crime from "./components/Crime.js";
import Horror from "./components/Horror.js";
import BookComments from './components/BookComments.js';

function App() {

   

        return (
            <Routes>
                <Route exact path="/" element={<Login />}></Route>
                <Route exact path="/sign" element={<Sign />}></Route>
                <Route exact path="/homepage/:userId" element={<UserPage />} />
                <Route exact path="/events/:userId" element={<Events />} />
                <Route exact path="/settings/:userId" element={<Settings />} />
                <Route exact path="/eventinformation/:userId/:eventId" element={<ShowEvents />} />

              
               
                <Route exact path="/bookgenres/sci-fi/:userId" element={<Scifi />} />
                <Route exact path="/bookgenres/history/:userId" element={<History />} />
                <Route exact path="/bookgenres/romance/:userId" element={<Romance />} />
                <Route exact path="/bookgenres/drama/:userId" element={<Drama />} />
                <Route exact path="/bookgenres/adventure/:userId" element={<Adventure />} />
                <Route exact path="/bookgenres/crime/:userId" element={<Crime />} />
                <Route exact path="/bookgenres/horror/:userId" element={<Horror />} />

                <Route exact path="/bookinformation/:userId/:bookId" element={<BookComments/> }></Route>
           
            </Routes>
        )
    

    




}

export default App;
