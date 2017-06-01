/**
 * Created by hepen on 5/26/2017.
 */
import {injectIntl} from 'react-intl';
module.exports = {
  Input: injectIntl(require('./js/components/input/Input').default),
  CollapseSection: injectIntl(require('./js/components/container/CollapseSection').default)
}
