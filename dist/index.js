'use strict';

var _reactIntl = require('react-intl');

require('./styles/index.css');

/**
 * Created by hepen on 5/26/2017.
 */
module.exports = {
    Form: (0, _reactIntl.injectIntl)(require('./js/components/container/Form').default),
    CollapseSection: (0, _reactIntl.injectIntl)(require('./js/components/container/CollapseSection').default),
    SmartGrid: (0, _reactIntl.injectIntl)(require('./js/components/container/SmartGrid').default),

    Input: (0, _reactIntl.injectIntl)(require('./js/components/input/Input').default),
    Button: (0, _reactIntl.injectIntl)(require('./js/components/button/BaseButton').default),
    Radio: (0, _reactIntl.injectIntl)(require('./js/components/input/Radio').default),
    Checkbox: (0, _reactIntl.injectIntl)(require('./js/components/input/Checkbox').default),
    Select: (0, _reactIntl.injectIntl)(require('./js/components/input/Select').default),
    Toggle: (0, _reactIntl.injectIntl)(require('./js/components/input/Toggle').default)
};