/**
 * Created by hepen on 5/26/2017.
 */
import {injectIntl} from 'react-intl';
import './styles/index.css';
module.exports = {
    Form: injectIntl(require('./js/components/container/Form').default),
    CollapseSection: injectIntl(require('./js/components/container/CollapseSection').default),
    SmartGrid: injectIntl(require('./js/components/container/SmartGrid').default),

    Input: injectIntl(require('./js/components/input/Input').default),
    Button: injectIntl(require('./js/components/button/BaseButton').default),
    Radio: injectIntl(require('./js/components/input/Radio').default),
    Checkbox: injectIntl(require('./js/components/input/Checkbox').default),
    Select: injectIntl(require('./js/components/input/Select').default),
    Toggle: injectIntl(require('./js/components/input/Toggle').default),
};
