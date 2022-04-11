import Connected from "../Connected/Connected"
import Styles from "./Header.module.css"
const Header = ({userInfo, connected, connectWallet}) => {
  console.log(connected)
  return (
    <div className={Styles.root}>
        <span className={Styles.logo}>STAKING<span className={Styles.logo2}> CONTRACT</span></span>
        <div className="">
          { connected? <Connected 
            token_balance={userInfo.token_balance}
            eth_balance={userInfo.eth_balance}
            address={userInfo.address}
            /> : <button onClick={connectWallet} className={Styles.connect_btn}>Connect Wallet</button>
          }
        </div>
    </div>
  )
}

export default Header