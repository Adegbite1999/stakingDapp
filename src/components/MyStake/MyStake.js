import clsx from 'clsx'
import React from 'react'
import Card from './Card/Card'
import Styles from './MyStake.module.css'


const MyStake = () => {
  
  return (
    <div className={Styles.root}>
        <h2 className={Styles.heading}>My stake</h2>

        <div className={Styles.stake_body}>
          <div className={Styles.card_container}>
            <Card 
              cardKey="Total Staked"
              cardValue = {'--:--'}
            />
            <Card 
              cardKey="Total Reward"
              cardValue = {'--:--'}
            />
          </div>
          <form  className={Styles.form} >
            <input 
              type = "number" 
              placeholder="Amount to stake" 
              className={Styles.input}
              id = "stake"
            />
            <button type='submit' className={clsx({[Styles.stake_btn]: true, [Styles.btn_diabled]: false})}
              // disabled = {!connected}
            >Stake</button>
          </form>

          <form  className={Styles.form} >
            <input 
              type = "number" 
              placeholder="Amount to unstake" 
              className={Styles.input}
              id = "unstake"
            />
            <button type="submit"
            className={clsx({[Styles.unstake_btn]: true, [Styles.btn_diabled]:false})}
            >Withdraw</button>
          </form>
          <form  className={Styles.form} >
            <input 
              type = "text" 
              placeholder="Search Detail of staker" 
              className={Styles.input}
              id ="address"
            />
            <button type="submit"
            className={clsx({[Styles.stake_btn]: true, })}
            >Search</button>
          </form>
        </div>
        <div className={Styles.card}>
          <h4 className={Styles.cc}>Get Details of staker</h4>
          <div className={Styles.cc}>
            <h4>Address Staker</h4>
          <p className={Styles.para}>ox</p>
          </div>
           <div className={Styles.cc}>
            <h4>Amount Staked</h4>
          <p className={Styles.para}>100 BRT</p>
          </div>
          <div className={Styles.cc}>
            <h4>Time Staked</h4>
          <p className={Styles.para}>March 20,2014</p>
          </div>
        </div>
    </div>
  )
}

export default MyStake