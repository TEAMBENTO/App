import React, { PureComponent } from 'react';
import styles from './About.css';

export default class About extends PureComponent {

  render() {
    return (
      <div className={styles.about}>
        <p>I am About</p>
      </div>
    );
  }

}