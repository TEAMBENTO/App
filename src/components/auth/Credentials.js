import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProfile } from '../profile/actions';
import styles from './Credentials.css';
import FormControl from '../shared/FormControl';

class Credentials extends PureComponent {

  static propTypes = {
    submit: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    addProfile: PropTypes.func.isRequired,
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
          console.log('payload', payload);
          const profile = { userId: payload._id };
          return this.props.addProfile(profile);
        });
    } this.props.submit(this.state);
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
  { addProfile }
)(Credentials);
