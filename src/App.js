import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import MyStake from './components/MyStake/MyStake';
import StakeHistory from './components/StakeHistory/StakeHistory';
import Footer from './components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import abi from "./utils/web3/abi.json";
import token from "./utils/web3/tokenAbi.json";
import { Contract, ethers,utils } from 'ethers';
const contractAddress = "0x40960D06132BBCBAA3FfA1B77d10e57C8578eF95";
const tokenAddress = "0xD0998d596E49F827fDBeb4f40aF29013354969B9"






function App() {
  //a flag to check status of user
  const [connected, setConnected] = useState(false) 
  const [stakeInput, setStakeInput] = useState("")
  const [stakeAmount, setStakeAmount] = useState(null)
  const [withdrawInput, setWithdrawInput] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState(null)


  const [userInfo, setUserInfo] = useState({
    eth_balance: 0,
    token_balance:0,
    address: null
  })

// console.log(userInfo)
const getAccountDetails = async (address) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const userEthBal = await provider.getBalance(address);
    const TokenContractInstance = new Contract(tokenAddress, token, provider);
    const userBRTBalance = await TokenContractInstance.balanceOf(address)
    return {userBRTBalance, userEthBal}
  }catch(err) {
    console.log(err)
  }
}
  // const getAccountDetails = async(address) => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     const userEthBal = await provider.getBalance(address)
  //     const BRTContractInstance = await new Contract(contractAddress,abi,provider)
  //     const userBRTBalance = await BRTContractInstance.balanceOf(address)
  //     return {userEthBal, userBRTBalance}
  //   } catch (error) {
  //     toast.error(error)
  //   }
  // }
  
    // handler for when user switch from one account to another or completely disconnected
    const handleAccountChanged = async (accounts) => {
      if(!!accounts.length) {
        const networkId = await window.ethereum.request({method: "eth_chainId"})
        if(Number(networkId) !== 4) return
        const accountDetails = await getAccountDetails(accounts[0])
  
        setUserInfo({
          eth_balance: accountDetails.userEthBal,
          token_balance: accountDetails.userBRTBalance,
          address: accounts[0]
        })
        setConnected(true)
      }else {
        setConnected(false)
        setUserInfo({
          eth_balance: 0,
          token_balance: 0,
          address: null
        })
        
      }
    }

      // handler for handling chain/network changed
  const handleChainChanged = async (chainid) => {
    if(Number(chainid) !== 4) {
      setConnected(false)
      setUserInfo({
        eth_balance: 0,
        token_balance: 0,
        address: null
      })
      
    return  toast.error("You are connected to the wrong network, please switch to rinkeby")
    }else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if(!accounts.length) return
      const accountDetails = await getAccountDetails(accounts[0])
        setUserInfo({
          eth_balance: accountDetails.userEthBal,
          token_balance: accountDetails.userBRTBalance,
          address: accounts[0]
        })
        setConnected(true)
      }
  }


// eager connect: an handler to eagerly connec user and fetch their data

const eagerConnect = async () =>{
  const networkId = await window.ethereum.request({method: "eth_chainId"})
  if(Number(networkId) !== 4) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const accounts = await provider.listAccounts();
  if(!accounts.length)return;
  const accountDetails = await getAccountDetails(accounts[0])
  setUserInfo({
    eth_balance:accountDetails.userEthBal,
    token_balance:accountDetails.userBRTBalance,
    address: accounts[0]
  })
setConnected(true)
}
const error = async() => {
const networkId = await window.ethereum.request({method:"eth_chainId"})
if(Number(networkId) !== 4) toast.error("please connect to rinkeby network")
}

useEffect(() => {
  if(!window.ethereum) return;
  // binding handlers to wallet events we care about
  window.ethereum.on("connect", eagerConnect)
  window.ethereum.on("accountsChanged", handleAccountChanged)
  window.ethereum.on('chainChanged', handleChainChanged);
},
// eslint-disable-next-line
[])


const connectWallet = async() =>{
  if (!!!window.ethereum || !!!window.web3){
    toast.error('please connect to an ethereum enabled browser')
    return;
  }
  const networkId = await window.ethereum.request({method: "eth_chainId"})
  if (!!window.ethereum || !!window.web3) {
    if((Number(networkId) === 4)){
     await window.ethereum.request({ method: 'eth_requestAccounts' }); 
      toast.success("wallet connected!")
   }else{
 await error()
   }
  }
}

const stakeHandler = async(e) =>{
    e.preventDefault()
    if(stakeInput ==="") toast("Input field cannot be empty")
    if(stakeInput < 0) toast("Yo cannot stake less than 0 BRT")
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer =provider.getSigner()
    const TokenContractInstance = new Contract(tokenAddress,token,signer)
    const BRTContractInstance = new Contract(contractAddress,abi,signer)
    const weiValue = utils.parseEther(stakeInput)
    await TokenContractInstance.approve(contractAddress,weiValue)
    await BRTContractInstance.stakeToken(weiValue)

    const accounts = await provider.listAccounts();
    if(!accounts.length) return
    const accountDetails = await getAccountDetails(accounts[0])
      setUserInfo({
        eth_balance: accountDetails.userEthBal,
        token_balance: accountDetails.userBRTBalance,
        address: accounts[0]
      })
      setConnected(true)
      toast.success(`You've successfully staked ${weiValue}` )
      setStakeInput("")
}


// inputChange
const onChangeInputHandler = ({target}) =>{
  switch (target.id) {
    case "stake":
      setStakeInput(target.value)
      break;
      case "withdraw":
        setWithdrawInput(target.value)
    default:
      break;
  }
} 


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
        stakeInput={stakeInput}
        onChangeInputHandler={onChangeInputHandler}
        stakeAmount={stakeAmount}
        withdrawInput={withdrawInput}
        withdrawAmount={withdrawAmount}
        stakeHandler={stakeHandler}

        />
        <StakeHistory
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
