export const authEndpoint = "https://accounts.spotify.com/authorize";
export const clientId = '874f362955384d4f82bcd802660e4b0c';
export const cilentSecret = 'acb440a270aa451694ca257703ae07e9';
export const scopes = [
  "user-read-email",
  "user-read-private",
  "user-library-read"
]


export const redirectURI = 'http://localhost:5174/app';

export const requestAuthorization = () => {
  let url = authEndpoint;
  url += "?client_id=" + clientId;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirectURI);
  url += "&show_dialog=false";
  url += "&scope=" + scopes.join("%20");
  window.location.href = url;
}