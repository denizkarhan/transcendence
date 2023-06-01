import MyNavbar from "./myNavbar";
import App from "./App";
import { useIsAuthenticated } from 'react-auth-kit'
import { Button, Container } from "react-bootstrap";
import LoginAndRegister from "./LoginAndRegister";

// export interface UserTemplate {
//   email: string;
//   firstname: string;
//   lastname: string;
//   id: number;
//   username: string;
//   twofaState: boolean;
// }
export default function Main() {
  // const [logState, setLogState] = useState<boolean>(false);
  // const [user, setUser] = useState<UserTemplate | null>(null);
  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     if (getCookie("access_token")) {
  //       await api
  //         .get("/users/profile")
  //         .then((response) => {
  //           setUser({
  //             email: response.data.email,
  //             firstname: response.data.email.first_name,
  //             lastname: response.data.email.last_name,
  //             id: response.data.email.id,
  //             username: response.data.email.username,
  //             twofaState: response.data.email.two_factor_auth,
  //           });
  //           setLogState(true);
  //           console.log(response);
  //         })
  //         .catch((error) => console.log(error));
  //     }
  //   };
  //   fetchUserProfile();
  // }, []);
  const isAuthenticated = useIsAuthenticated();
  return (

    <div>
      {isAuthenticated() ? <MyNavbar /> : null}
      <App />
    </div>
  );
}
