import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Toggle from '../components/Toggle';

const ToggleStory = function() {
  storiesOf('Toggle', module)
  .add('default view', () => (
    <Toggle isToggleOn={false} />
  )).add('onToggle function', () => (
    <Toggle onToggle={(toggleValue) => {console.log("Toggle is " + toggleValue);return toggleValue}}/>
  ));
}

export default ToggleStory;
