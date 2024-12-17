import List from "./components/List/List"
import Chat from "./components/Chat/Chat"
import Detail from "./components/Detail/Detail"
import Login from "./components/Login/Login"
import Notification from "./components/Notification/Notification"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"
import { useUserStore } from "./lib/useStore"
import { useChatStore } from "./lib/chatStore"

const App = () => {

const {currentUser, isLoading, fetchUserInfo } = useUserStore();
const { chatId } = useChatStore();

  // useEffect(() => {
  //   const unSub = onAuthStateChanged(auth, async (user) => {
  //     if (user) {

  //       if (user.emailVerified) {

  //         fetchUserInfo(user.uid);
  //       } else {

  //         useUserStore.setState({ currentUser: null, isLoading: false });
  //         toast.error("Please verify your email before accessing the application.");
  //         auth.signOut(); // Sign out the user if email is not verified
  //       }
  //     }
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [fetchUserInfo]);

  useEffect(()=>{

    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  },[fetchUserInfo]);

  if(isLoading) return <div className="loading"><h4>Loading...</h4><div className="loader"></div></div>



  return (
    <div className='container'>
      {
        currentUser ? (
        <>
          <List/>
          {chatId && <Chat/>}
          {chatId && <Detail/>}
        </>
        ) : (
        <Login/>
      )}
      <Notification/>
    </div>
  )
}

export default App