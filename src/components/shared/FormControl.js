import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FormControl extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.element
  };

  render() {
    const { label, children } = this.props;

    return (
      <div>
        { label && <label>{label}:</label> }
        <div className="control">
          {children}
        </div>
      </div>
    );
  }
}

export default FormControl;