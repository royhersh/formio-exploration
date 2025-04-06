import type { Meta, StoryObj } from '@storybook/react';
import Kanye from './Kanye';

const meta: Meta<typeof Kanye> = {
  title: 'Components/Kanye',
  component: Kanye,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Kanye>;

export const Default: Story = {
  args: {},
};
