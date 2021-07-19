import { Meta, Story } from '@storybook/react';
import AppWithRedux from './AppWithRedux';
import { ReduxStoreProviderDecorator } from './stories/decorators/ReduxStoreProviderDecorator';

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story = () => <AppWithRedux />
export const AppWithReduxExample = Template.bind({});
