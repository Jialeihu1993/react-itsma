/**
 * Created by hepen on 5/26/2017.
 */
import {injectIntl} from 'react-intl';
import CssUtils from './js/utils/CssUtils';
const styleMap = require('./styles/index.scss');

CssUtils.setCssMap(styleMap);

module.exports = {
  Input: injectIntl(require('./js/components/input/Input').default),
  CollapseSection: injectIntl(require('./js/components/container/CollapseSection').default)
};
