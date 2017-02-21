const React = require('react');
const {shallow} = require('enzyme');
const mapRET = require('../mapReactElementTree.js');

it('works', () => {
  const nodes = (
    <div>
      <span x="x">
        foo
      </span>
    </div>
  );
  const res = mapRET(nodes, (node) => {
    if (node.type === 'span') {
      return React.cloneElement(node, {y: 'y'});
    }
    return node;
  });

  const el = shallow(res);
  const spanProps = el.find('span').props();

  // was cloned
  expect(nodes).not.toBe(res);

  // original prop preserved
  expect(spanProps.x).toBe('x');

  // new prop added
  expect(spanProps.y).toBe('y');
});

