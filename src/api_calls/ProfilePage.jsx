import { useState, useEffect, Profiler } from "react";
import { Link } from "react-router-dom";

import "./ProfilePage.css";
import { refreshAccessToken } from "../pages/config";
import { useParams } from 'react-router-dom'


function ProfilePage() {
    const {userId}=useParams();

    return(
        <div>
            <h1>This is {userId}'s page</h1>
        </div>
      );
}
export {ProfilePage};