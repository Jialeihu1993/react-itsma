/**
 * Created by hepen on 5/26/2017.
 */
import React from 'react';

export default class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.property = {};
  }

  componentWillMount() {

  }

  render() {
    this.setProperty();
    if (this._visible == false) return <template/>

    return this.renderComponent();
  }

  renderComponent() {

  }

  setProperty() {
    let allProps = this.props;
    let keys = Object.keys(allProps);
    keys.forEach(key => {
      this.property[key] = this.getProperty(key)
    })
  }

  getProperty(propertyName) {
    let property = this.props[propertyName];

/*    if (this.isFunction(property)) {
      return property(this);
    }*/

    return property;
  }

  isFunction(func) {
    return typeof func === 'function';
  }
}

BaseComponent.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
  style: React.PropTypes.string,
  className: React.PropTypes.string,
  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
  visible: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),

  onClick: React.PropTypes.func
};

BaseComponent.defaultProps = {
  disabled: false,
  visible: true,

  onClick: () => {}
};
