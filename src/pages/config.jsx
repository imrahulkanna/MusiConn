const authEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const clientId = '874f362955384d4f82bcd802660e4b0c';
const clientSecret = 'c03782320ae14b19a77ee860286d0853';
const redirectURI = 'http://musiconn.in/app';


const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'streaming',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-modify',
  'user-follow-read',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private'
]

// authorizing code
export const requestAuthorization = () => {
  let url = authEndpoint;
  url += "?client_id=" + clientId;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirectURI);
  url += "&show_dialog=true";
  url += "&scope=" + scopes.join("%20");
  window.location.href = url;
}


// accessing the token code
// read from bottom to top to understand

function handleAuthorizationResponse(xhr) {
    if ( xhr.status == 200 ){
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        if ( data.access_token != undefined ){
            var accessToken = data.access_token;
            localStorage.setItem('accessToken', accessToken)
        }
        if ( data.refresh_token  != undefined ){
            var refreshToken = data.refresh_token;
            localStorage.setItem('refreshToken', refreshToken)
        }
        console.log('on config: '+accessToken);
        console.log('on config: '+refreshToken);
        onPageLoad();
    }
    else {
        console.log(xhr.responseText);
        alert(xhr.responseText);
    }
}

function callAuthorizationApi(body){
  let xhr = new XMLHttpRequest();
  xhr.open("POST", tokenEndpoint, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(clientId + ":" + clientSecret));
  xhr.send(body);
  console.log(xhr);
  xhr.onload = function() {
    handleAuthorizationResponse(xhr);
  };
}

function fetchAccessToken(code) {
  let body = "grant_type=authorization_code";
  body += "&code=" + code; 
  body += "&redirect_uri=" + encodeURI(redirectURI);
  body += "&client_id=" + clientId;
  body += "&client_secret=" + clientSecret;
  callAuthorizationApi(body); 
}

function getCode() {
  let code = null;
  const queryString = window.location.search;
  if(queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get('code');
  }
  return code;
}

function handleRedirect() {
  let code = getCode();
  fetchAccessToken(code);
  window.history.pushState("", "", redirectURI);
}

export function onPageLoad() {
  if ( window.location.search.length > 0 ) {
    handleRedirect();
  }
}
