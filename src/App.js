import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import MyStake from './components/MyStake/MyStake';
import StakeHistory from './components/StakeHistory/StakeHistory';
import Footer from './components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import abi from "./utils/web3/abi.json";
const stakingAddress = "0x40960D06132BBCBAA3FfA1B77d10e57C8578eF95";






function App() {
  //a flag to check status of user
  const [connected, setConnected] = useState(false)


  // user details i.e ETH balance && brt balance && address

  const [userInfo, setUserInfo] = useState({
    eth_balance: 10000000,
    token_balance:1000000,
    address: "0xf4bfaf916a68b0fC859D63a319034C0f72A88a5C"
  })
  
  // Request user to connect wallet;
const connectWallet = async() =>{
  if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
   await window.ethereum.request({ method: 'eth_requestAccounts' }); 
   toast.success("wallet connected!")
  }else{
    toast.dark("use an ethereum enabled")
  }
}

// get user account details
// useEffect(() =>{
// toast.error()
// },[])

// Ensure that user are on the right network



//

  return (
    <div className="App">
      <ToastContainer/>
      <Header 
      connectWallet={connectWallet}
      userInfo={userInfo}
      connected={connected}
      />
      <main className='main'>
        <MyStake
        />
        <StakeHistory
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
