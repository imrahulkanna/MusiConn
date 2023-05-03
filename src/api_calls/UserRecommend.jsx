import { useState, useEffect } from "react";
import "./UserRecommend.css";
import { refreshAccessToken } from "../pages/config";

const currUserProfileEndpoint = "https://api.spotify.com/v1/me";
const userProfileEndpoint = "https://api.spotify.com/v1/users/";
const userRecommendationsEndpoint = "https://musiconn.pythonanywhere.com/api/users/";


function UserRecommend() {
  const [userDetailsArr, setUserDetailsArr] = useState([]);

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

      getRecommendedUserIDs(currUserDetails.id); // to get recommeneded users' IDs for current user
    };

    getCurrUserProfile(); // to get curr user ID
  }, []);

  return (
    <div>
      <h1 className="title">Find People</h1>
      <p className="prompt">with similar music taste</p>
      <div className="outer-container">
        <div className="flex-container">
          {userDetailsArr.map((userDetails, track) => (
            <div className="profile-card" key={track}>
              <div className="img-container">
                <a href={`https://open.spotify.com/user/${userDetails.id}`}>
                  <img
                    src={
                      userDetails.images.length > 0
                        ? userDetails.images[0].url
                        : "./public/luffy.jpeg"
                    }
                    alt="profile pic"
                    className="profile-img"
                  />
                </a>
              </div>
              <div className="text-container">
                <p className="profile-name">
                  <a href={`https://open.spotify.com/user/${userDetails.id}`}>
                    {userDetails.display_name}
                  </a>
                </p>
                <p>
                  <button
                    onClick={() => window.open("http://www.google.com")}
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

export default UserRecommend;
