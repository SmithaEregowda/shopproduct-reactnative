import {  StyleSheet} from 'react-native';
import { AuthContext, AuthContextProvider } from './store/auth';
import { useContext } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { BottomNavigation } from './navigation/bottomnav';
import AuthNavigator from './navigation/authnav';

export default function App() {
  
  const Navigation=()=>{
    const {authToken}=useContext(AuthContext)
    console.log(authToken)
    return(
     
      authToken?
        <BottomNavigation />
      :
      <AuthNavigator />
    )
  }

  return (
    <RootSiblingParent>
      <AuthContextProvider>
     <Navigation />
    </AuthContextProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
