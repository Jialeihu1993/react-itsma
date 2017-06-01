/**
 * Created by hepen on 5/26/2017.
 */
import React from 'react';
import validator from 'validator';
import {FormattedMessage} from 'react-intl';
import {FormControl} from 'react-bootstrap';
import {INPUT_PROPERTY, INPUT_PROPERTY_SINGLE} from '../contants/ConstantsProperty';
import BaseComponent from './BaseComponent';

export default class Input extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      validated: true,
      invalidMessage: null
    }
    this.onBlurFunc;
  }

  componentWillMount() {
  }

  renderComponent() {
    return (
      <div style={{height: '100px'}}>
        {this.renderLabel()}
        <div>
          {this.renderInput()}
        </div>
        {this.renderInValidation()}
      </div>
    )
  }

  renderLabel() {
    if (this.property.label) {
      return (
        <div className="cusMargin17"><span className="inputTitle"><FormattedMessage id={this.property.label} defaultMessage={this.property.label}/></span>
          {this.property.required.toString() === 'true'  ? (<span className="manatory">*</span>) : null}
        </div>)
    }
    return null;
  }

  renderInput() {
    let property = {}, hasBlur = false;
    let propertyKeys = Object.keys(this.property);
    propertyKeys = propertyKeys.filter(key => INPUT_PROPERTY.indexOf(key) >= 0);
    propertyKeys.forEach(key => {
      if (INPUT_PROPERTY_SINGLE.indexOf(key) >= 0 && this.property[key].toString() !== 'true') {
        delete this.property[key];
      } else if (key === 'onBlur') {
        this.onBlurFunc = this.property[key];
        hasBlur = true;
        property[key] = this.onBlurValidation.bind(this);
      } else {
        property[key] = this.property[key];
      }
    });
    if (!hasBlur) {
      property.onBlur = this.onBlurValidation.bind(this);
    }
    let element = React.createElement('FormControl', property, null);
    return (<FormControl {...property}/>);
  }

  renderInValidation() {
    let message = this.state.invalidMessage || 'Please provide a value for this field';
    return (
      <div className={this.state.validated ? 'hide' : ''}>
        <span className="warnColor"><FormattedMessage id='a' defaultMessage={message}/></span>
      </div>
    )
  }

  onBlurValidation(event) {
    let result;
    if (this.property.validateFunc) {
      result = this.property.validateFunc(event);
      if(!result){
        this.setState({validated: false, invalidMessage: this.property.validationMessage});
      }
    } else {
      if (this.property.required.toString() === 'true') {
        result = event.target.value != null && event.target.value != '';
        if (!result){
          this.setState({validated: false, invalidMessage: null});
        }
      }
    }
    result && this.setState({validated: true, invalidMessage: null});
    this.onBlurFunc && this.onBlurFunc(event);
    return result;
  }

  getProperty(propertyName) {
    let property = this.props[propertyName];

/*    if (this.isFunction(property) && propertyName != 'validation') {
      return property(this);
    }*/

    return property;
  }
}

Input.propTypes = Object.assign(BaseComponent.propTypes, {
  value: React.PropTypes.string,
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  required: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
  max: React.PropTypes.string,
  min: React.PropTypes.string,
  maxLength: React.PropTypes.string,
  type: React.PropTypes.string,
  validationMessage: React.PropTypes.string,

  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  validateFunc: React.PropTypes.func

});
