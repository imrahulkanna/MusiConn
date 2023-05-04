import { useState, useEffect, Profiler } from "react";
import { Link } from "react-router-dom";

import "./ProfilePage.css";
import { refreshAccessToken } from "../pages/config";
import { useParams } from 'react-router-dom'
import UserContainer from "../api_calls/UserContainer";
import ArtistContainer from "../api_calls/ArtistContainer";
import TopTracksContainer from "../api_calls/TopTracksContainer.jsx";

function ProfilePage() {
    const {userId}=useParams();

    return(
        <div>
            <h1>This is {userId}'s page</h1>
            
      <UserContainer />

        {/* <ArtistContainer />
        <TopTracksContainer /> */}

        </div>
      );
}
export {ProfilePage};