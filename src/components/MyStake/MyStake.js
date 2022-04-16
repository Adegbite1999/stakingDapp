import clsx from "clsx";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Card from "./Card/Card";
import Styles from "./MyStake.module.css";

const MyStake = ({
  stakeAmount,
  reward,
  stakeHandler,
  onChangeInputHandler,
  stakeInput,
  withdrawInput,
  withdrawHandler,
  addressInput,
  fetchStakeDetails,
  data
}) => {
  const [show, setShow] = useState(false);
  const modalHandler = () => {
    setShow(!show);
  };
  const {amount, time, valid} = data;


  return (
    <div className={Styles.root}>
      <h2 className={Styles.heading}>My stake</h2>
      <div>
        <div className={Styles.stake_body}>
          <div className={Styles.card_container}>
            <Card cardKey="Total Staked" cardValue={stakeAmount} />
            <Card cardKey="Total Reward" cardValue={reward} />
          </div>
          <form onSubmit={stakeHandler} className={Styles.form}>
            <input
              type="number"
              value={stakeInput}
              onChange={onChangeInputHandler}
              placeholder="Amount to stake"
              className={Styles.input}
              id="stake"
            />
            <button
              type="submit"
              className={clsx({
                [Styles.stake_btn]: true,
                [Styles.btn_diabled]: false,
              })}
              // disabled = {!connected}
            >
              Stake
            </button>
          </form>

          <form onSubmit={withdrawHandler} className={Styles.form}>
            <input
              type="number"
              placeholder="Amount to withdraw"
              value={withdrawInput}
              onChange={onChangeInputHandler}
              className={Styles.input}
              id="withdraw"
            />
            <button
              type="submit"
              className={clsx({
                [Styles.unstake_btn]: true,
                [Styles.btn_diabled]: false,
              })}
            >
              Withdraw
            </button>
          </form>
        <button className={Styles.bttn} onClick={modalHandler}>Click to view details of stakers</button>
        </div>

        {show && (
          <Modal onClose={modalHandler}>
            <div className={Styles.md}>
            <form onClick={fetchStakeDetails} className={Styles.form}>
            <input
              type="text"
              placeholder="Search Detail of staker"
              className={Styles.input}
              value={addressInput}
              onChange={onChangeInputHandler}
              id="address"
            />
            <button
              // type="submit"
              className={clsx({ [Styles.stake_btn]: true })}
            >
              Search
            </button>
          </form>
            </div>
            <div className={Styles.card}>
             <div className={Styles.header}>
             <h4 className={Styles.cc}>Get Details of staker</h4>
              <button className={Styles.clear} onClick={modalHandler}>*</button>
             </div>         
              {/* <div className={Styles.cc}>
                <h4>Address Staker</h4>
                <p className={Styles.para}>ox</p>
              </div> */}
              <div className={Styles.cc}>
                {amount === "0.0" ? <p>Address is not a staker yet</p> : null}
                <h4>Amount Staked</h4>
               {amount === undefined? <p>0.00{`BRT `}</p> :<p className={Styles.para}>{`${amount} BRT`}</p>}
              </div>
              <div className={Styles.cc}>
                <h4>Time Staked</h4>
              {valid? <p className={Styles.para}>{time}</p> : null}
              </div>
              
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MyStake;
