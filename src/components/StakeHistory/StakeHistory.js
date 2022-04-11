import React from 'react'
import Styles from './StakeHistory.module.css';
import clsx from 'clsx';


const StakeHistory = ({stakeData}) => {
  return (
    <div className={Styles.wrapper}>
    <div className={Styles.root}>
        <table className= {Styles.table}>
          <thead className = {Styles.table_header}>
              <tr className={Styles.table__head_row}>
                <th className={Styles.table_head_data}>S/N</th>
                <th className={Styles.table_head_data}>Amount Staked</th>
                <th className={Styles.table_head_data}>Account</th>
                <th className={Styles.table_head_data}>Action</th>
                <th className={Styles.table_head_data}>Time</th>
              </tr>
          </thead>
          <tbody>
       <tr className={clsx({[Styles.table_row]: true, [Styles.unstake_style]:false, [Styles.stake_style]:false})}>
                <td className= {Styles.table_data}>
                  {/* {index + 1} */}
                  0
                </td>
                <td className= {Styles.table_data}>
                  {/* {Number(utils.formatUnits(item.amount, 18)).toFixed(4)} */}
                  100.00 BRT
                </td>
                <td className= {Styles.table_data}>
                  {/* {addressShortner(item.account, false)} */}
                  0xFRdrD45356fhddyd
                </td>
                <td className= {Styles.table_data}>
                  {/* {item.type} */}
                  Stake
                </td>
                <td className= {Styles.table_data}>
                  {/* {formatDate(item.time)} */}
                  April 20, 2022
                </td>
              </tr>
            
          </tbody>
        </table>
    </div>
    </div>
  )
}

export default StakeHistory