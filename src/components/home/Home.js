import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserProfile } from '../profile/reducers';
import { loadUserProfile, queryProfile } from '../profile/actions';
import { getUser } from '../auth/reducers';
import styles from './Home.css';


class Home extends PureComponent {

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
      <div className={styles.home}>
        <p> Welcome to Rally</p>
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
)(Home);