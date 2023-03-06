
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { useGoogleOneTapLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const [ user, setUser ] = useState({
    name:"",
    email: "",
    avatarUrl: ""
  })
  useGoogleOneTapLogin({
    onSuccess: credentialResponse => handleSuccess({credentialResponse, type: 'oneTap'}),
  })
  const login = useGoogleLogin({
    onSuccess: tokenResponse => handleSuccess({tokenResponse, type: 'oneClick'}),
  });
  async function handleSuccess(data){
    switch(data.type){
      case 'oneTap':
        console.log(data.credentialResponse)
        const decoded = await jwtDecode(data.credentialResponse.credential)
        console.log(decoded)
        setUser({name: decoded.given_name, email: decoded.email, avatarUrl: decoded.picture})
        break
      case 'oneClick':
        try {
          console.log(data.tokenResponse)
          let res = await axios(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${data.tokenResponse.access_token}`)
          console.log(res)
          setUser({name: res.data.given_name, email: res.data.email, avatarUrl: res.data.picture})
        } catch (err) {
          console.log(err.message)
        }
        break
      default:
        return null
    }
    
  }
  // function handleLogout(){
  //   googleLogout();
  // }
  return (
    <div className="App">
            <button
              onClick={login}
            >
              Sign in with Google 🚀
            </button>
            {/* <GoogleLogin
              onSuccess={credentialResponse => {
                console.log({credentialResponse});
                const decoded = jwtDecode(credentialResponse.credential)
                console.log(decoded);
                handleSuccess(decoded)
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            /> */}

            {/* <button onClick={() => login()}>
              Sign in with Google 🚀{' '}
            </button>; */}
            <div>
              <br></br>
              {user.avatarUrl && <img src={user.avatarUrl} alt="avatar"></img>}
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </div>
            {/* <p>
              {user.email && <button onClick={handleLogout}>
                Log Out
              </button>}
            </p> */}
    </div>
  );
}

export default App;
