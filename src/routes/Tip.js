import React from 'react';
import { connect } from 'dva';
import styles from './Tip.css';
import Tips from '../components/Tips';

function Tip({tip}) {
  const {fireFox,google} = tip
  const EnterroomProps = {
    fireFox:fireFox,
    google:google
  }
  return (
    <div className={styles.normal}>
      <Tips {...EnterroomProps}/>
    </div>
  );
}

function mapStateToProps({tip}) {
  return {tip};
}

export default connect(mapStateToProps)(Tip);
