import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserProfile } from '../profile/reducers';
import { loadUserProfile, queryProfile } from '../profile/actions';
import { getUser } from '../auth/reducers';
import styles from './About.css';
import { GithubCircleIcon } from 'mdi-react';
// import steph from '../../../assets/Steph.jpg';
// import Henry from '../../../assets/Henry.jpg';

class About extends PureComponent {

  static propTypes = {
    loadUserProfile: PropTypes.func.isRequired,
    queryProfile: PropTypes.func.isRequired,
    user: PropTypes.object,
    userProfile: PropTypes.object
  };

  componentDidMount() {
    if(this.props.user !== null) {
      this.props.queryProfile(this.props.user._id)
        .then(({ payload }) => {
          return this.props.loadUserProfile(payload[0]._id);
        });
    }
  }

  render() {
    return (
      <div className={styles.about}>
        <div className="each-person">
          <img src="https://avatars3.githubusercontent.com/u/16010116?s=460&v=4"/>
          <div className="info">
            <p>This is Steph</p>
            <a href="https://github.com/stephaniesmith"><GithubCircleIcon color="black"/></a>
          </div>
        </div>
        <div className="each-person">
          <img src="https://i.imgur.com/eAfLGvz.jpg"/>
          <div className="info">
            <p>This is Henry</p>
            <a href="https://github.com/hnrzzle"><GithubCircleIcon color="black"/></a>
          </div>
        </div>
        <div className="each-person">
          <img src="https://avatars2.githubusercontent.com/u/34801846?s=400&u=d624a01194d0aaa6e839eb375cc25c724ba50cd6&v=4"/>
          <div className="info">
            <p>This is Steele</p>
            <a href="https://github.com/SteeleWalston"><GithubCircleIcon color="black"/></a>
          </div>
        </div>
        <div className="each-person">
          <img src="https://avatars3.githubusercontent.com/u/23265017?s=400&u=d5fd3e7799176897c3413368151792441a76c8b2&v=4"/>
          <div className="info">
            <p>This is Jeff</p>
            <a href="https://github.com/J3ffcon1"><GithubCircleIcon color="black"/></a>
          </div>
        </div>
      </div>
    );
  }

}

export default connect(
  state => ({ 
    user: getUser(state),
    userProfile: getUserProfile(state)
  }),
  { queryProfile, loadUserProfile }
)(About);