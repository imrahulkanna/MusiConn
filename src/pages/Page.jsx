import "../App.css"
import { NavBar } from "../api_calls/NavBar.jsx";
import { ProfilePage } from "../api_calls/ProfilePage.jsx";

 let Page=()=> {


  return (
    <div className="App">
      <NavBar />
      <ProfilePage />
    </div>
  );
 
}

export default  Page;

