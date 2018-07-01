import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProfile, loadProfile, queryProfile, loadUserProfile } from '../profile/actions';
import styles from './Credentials.css';
import FormControl from '../shared/FormControl';

class Credentials extends PureComponent {

  static propTypes = {
    submit: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    addProfile: PropTypes.func.isRequired,
    loadProfile: PropTypes.func.isRequired,
    queryProfile: PropTypes.func.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
    allowName: PropTypes.bool
  };

  state = {
    name: '',
    email: '',
    password: ''
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if(this.props.allowName) {
      return this.props.submit(this.state)
        .then(({ payload }) => {
          const profile = { userId: payload._id };
          return this.props.addProfile(profile)
            .then(({ payload }) => {
              return this.props.loadUserProfile(payload._id);
            })
            .then(({ payload }) => {
              return this.props.loadProfile(payload._id);
            });
        });
    } return this.props.submit(this.state)
      .then(({ payload }) => {
        return this.props.queryProfile(payload._id); 
      })
      .then(({ payload }) => {
        return this.props.loadUserProfile(payload[0]._id);
      });
  };

  render() {
    const { action, allowName = false } = this.props;
    const { name, email, password } = this.state;

    return (
      <form className={styles.credentials} onSubmit={this.handleSubmit}>
        { allowName && 
          <FormControl label="name">
            <input name="name" value={name} onChange={this.handleChange}/>
          </FormControl>
        }
        <FormControl label="email">
          <input name="email" value={email} onChange={this.handleChange}/>
        </FormControl>

        <FormControl label="password">
          <input type="password" name="password"
            value={password} onChange={this.handleChange}/>
        </FormControl>
        
        <FormControl>
          <button>{action}</button>
        </FormControl>
      </form>
    );
  }
}

export default connect(
  null,
  { addProfile, loadProfile, queryProfile, loadUserProfile }
)(Credentials);
