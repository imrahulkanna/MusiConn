import { useState, useEffect } from "react";
import "./UserRecommend.css";
import { refreshAccessToken } from "../pages/config";
import {Link} from "react-router-dom";
import { db } from  "../../Firebase";

import {
  collection,
  addDoc
} from "firebase/firestore";

const currUserProfileEndpoint = "https://api.spotify.com/v1/me";
const userProfileEndpoint = "https://api.spotify.com/v1/users/";
const userRecommendationsEndpoint = "https://musiconn.pythonanywhere.com/api/users/";
const connectionsRef = collection(db, "connections");

function UserRecommend() {
  const [userDetailsArr, setUserDetailsArr] = useState([]);
  let [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    // getting details of the recommended users from Spotify API
    const getRecommendedUserDetails = async (userIDsArr) => {
      Promise.all(
        userIDsArr.map(async (id, track) => {
          var url = userProfileEndpoint + id;
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          if (response.status === 401) {
            refreshAccessToken();
            accessToken = localStorage.getItem("accessToken");
            await getCurrUserProfile();
          }

          const userDetails = await response.json();
          return userDetails;
        })
      ).then((userDetailsArr) => setUserDetailsArr(userDetailsArr));
    };

    // getting IDs of the recommended users from flask API
    const getRecommendedUserIDs = async (id) => {
      let url = userRecommendationsEndpoint + id + "/recommendations";
      const response1 = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response1.json();
      getRecommendedUserDetails(data.recommendations);
    };

    // getting currently logged user id from Spotify API
    const getCurrUserProfile = async () => {
      const response = await fetch(currUserProfileEndpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.status === 401) {
        refreshAccessToken();
        accessToken = localStorage.getItem("accessToken");
        await getCurrUserProfile();
      }
      const currUserDetails = await response.json();

      setCurrentUser(currUserDetails.id);
      getRecommendedUserIDs(currUserDetails.id); // to get recommeneded users' IDs for current user
    };

    getCurrUserProfile(); // to get curr user ID
  }, []);

  const addFriend = async (index) =>
  {
    if (userDetailsArr.length == 0) return;
    await addDoc(connectionsRef, {
      status: "accept",
      from: currentUser,
      to: userDetailsArr[index].id
    });

    setUserDetailsArr(userDetailsArr.filter((item) => {
      return item.id !== userDetailsArr[index].id;
    }));
  }

  return (
    <div>
      <h1 className="title">Find People</h1>
      <p className="prompt">with similar music taste</p>
      <div className="outer-container">
        <div className="flex-container">
          {userDetailsArr.length == 0?
          <h2>Loading...</h2>:
          userDetailsArr.map((userDetails, track) => (
            <div className="profile-card" key={track}>
              <div className="img-container">
                <Link to={`/profile/${userDetails.id}`}>
                  <img
                    src={
                      userDetails.images.length > 0
                        ? userDetails.images[0].url

                        :getAvatarUrl(userDetails.id)
                        // : "./public/luffy.jpeg"
                    }
                    alt="profile pic"
                    className="profile-img"
                  />
                </Link>
              </div>
              <div className="text-container">
                <p className="profile-name">
                  <Link to={`/profile/${userDetails.id}`}>
                    {userDetails.display_name}
                  </Link>
                </p>
                <p>
                  <button
                    onClick={() => addFriend(track)}
                    className="add-friend">
                    Add Friend
                  </button>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
  
}

const getAvatarUrl = (userId) => {
  const apiBaseUrl = 'https://avatars.dicebear.com/api/';
  const avatarStyle = 'male'; // or 'female' for different styles
  const avatarOptions = 'mood[]=happy'; // customize options as needed
  const avatarSize = 200;

  const avatarUrl = `${apiBaseUrl}${avatarStyle}/${userId}.svg?${avatarOptions}`;

  return avatarUrl;
};

export default UserRecommend;
