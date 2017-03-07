import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ContainerPanel from '../components/ContainerPanel';

const ContainerPanelStory = function() {
storiesOf('ContainerPanel', module)
.add('Expanded', () => (
  <ContainerPanel title="More Setting"  expanded>
    <label>Hello</label>
   </ContainerPanel>
)).add('Collapse', () => (
  <ContainerPanel title="More Setting">
    <label>Hello</label>
  </ContainerPanel>
));
}

export default ContainerPanelStory;
