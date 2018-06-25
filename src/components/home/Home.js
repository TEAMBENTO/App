import React, { PureComponent } from 'react';
import styles from './Home.css';

export default class Home extends PureComponent {

  render() {
    return (
      <div className={styles.home}>
        <p>I am Home</p>
      </div>
    );
  }

}