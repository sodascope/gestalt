// @flow strict
import { create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import Link from './Link.js';
import Text from './Text.js';
import Tooltip from './Tooltip.js';
import { FixedZIndex } from './zIndex.js';

test('Tooltip renders', () => {
  const component = create(
    <Tooltip text="This is a tooltip">
      <div>Hi</div>
    </Tooltip>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tooltip renders the link when hovered', () => {
  const { container, getByText } = render(
    <Tooltip
      link={
        <Link href="https://pinterest.com" target="blank">
          <Text color="inverse" size="100" weight="bold">
            Learn more
          </Text>
        </Link>
      }
      text="This is a tooltip"
    >
      <div>Hi</div>
    </Tooltip>,
  );

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
  const ariaContainer = container.querySelector('[aria-label]');
  expect(ariaContainer).not.toBe(null);

  if (ariaContainer) {
    fireEvent.mouseEnter(ariaContainer);
  }
  const { body } = document;
  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  const element = getByText('Learn more');
  expect(body && body.contains(element)).toBeTruthy();
});

test('Tooltip should render as expected when hovered', () => {
  const { container, getByText } = render(
    <Tooltip text="This is a tooltip">
      <div>Hi</div>
    </Tooltip>,
  );

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
  const ariaContainer = container.querySelector('[aria-label]');
  expect(ariaContainer).not.toBe(null);

  if (ariaContainer) {
    fireEvent.mouseEnter(ariaContainer);
  }

  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  expect(getByText('This is a tooltip')).toBeVisible();
});

test('Tooltip renders with idealDirection', () => {
  const component = create(
    <Tooltip text="This is a tooltip" idealDirection="up">
      <div>Hi</div>
    </Tooltip>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tooltip renders with zIndex', () => {
  const fixedZIndex = new FixedZIndex(100);
  const { container, getByText } = render(
    <Tooltip text="This is a tooltip" zIndex={fixedZIndex}>
      <div>Hi</div>
    </Tooltip>,
  );
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
  const ariaContainer = container.querySelector('[aria-label]');
  expect(ariaContainer).not.toBe(null);

  if (ariaContainer) {
    fireEvent.mouseEnter(ariaContainer);
  }

  const { body } = document;
  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  const tooltipText = getByText('This is a tooltip');
  // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
  const layer = body && body.querySelector('.layer');
  expect(layer && getComputedStyle(layer).zIndex).toEqual('100');
  expect(body && body.contains(tooltipText)).toBe(true);
});
