import React, { useState } from 'react'
import Styles from './StakeHistory.module.css';
import clsx from 'clsx';
import {utils} from "ethers";
import { addressShortner, formatDate } from '../../utils/helpers';


const StakeHistory = ({stakeHistory, withdrawHistory}) => {
  const [a, setA] = useState(false)

  const handler = () =>{
    setA(!a)
  }
  return (
    <div className={Styles.wrapper}>
       <button onClick={handler}>{a? 'STAKED HISTORY': 'WIDTHRAWL HISTORY'}</button>
    <div className={Styles.root}>
        <table className= {Styles.table}>
          <thead className = {Styles.table_header}>
              <tr className={Styles.table__head_row}>
                <th className={Styles.table_head_data}>S/N</th>
                <th className={Styles.table_head_data}>{a? 'Amount Staked' : 'Amount widthdraw'}</th>
                <th className={Styles.table_head_data}>Account</th>
                {/* <th className={Styles.table_head_data}>Action</th> */}
                <th className={Styles.table_head_data}>Time</th>
              </tr>
          </thead>
          <tbody>
            {
              a ? (
                stakeHistory.map((item, index) => {
                  return <tr key={index} className={clsx()}>
                    <td className= {Styles.table_data}>
                      {index + 1}
                    </td>
                    <td className= {Styles.table_data}>
                      {Number(utils.formatUnits(item.amount, 18)).toFixed(4)}
                    </td>
                    <td className= {Styles.table_data}>
                      {addressShortner(item.account, false)}
                    </td>
                    {/* <td className= {Styles.table_data}>
                      {item.type}
                    </td> */}
                    <td className= {Styles.table_data}>
                      {formatDate(item.time)}
                    </td>
                  </tr>
                })
              ) : (
                withdrawHistory.map((item, index) => {
                  return <tr key={index} className={clsx()}>
                    <td className= {Styles.table_data}>
                      {index + 1}
                    </td>
                    <td className= {Styles.table_data}>
                      {Number(utils.formatUnits(item.amount, 18)).toFixed(4)}
                    </td>
                    <td className= {Styles.table_data}>
                      {addressShortner(item.account, false)}
                    </td>
                    {/* <td className= {Styles.table_data}>
                      {item.type}
                    </td> */}
                    <td className= {Styles.table_data}>
                      {formatDate(item.time)}
                    </td>
                  </tr>
                })
              ) 
            }
          </tbody>
      
        </table>
    </div>
    </div>
  )
}

export default StakeHistory