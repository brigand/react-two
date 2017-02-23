const React = require('react');
const two = require('../reactTwo.js');

it('works', () => {
  const ti = two({render: () => {}, setState: () => {}}, {});
  expect(typeof ti.watch).toBe('function');
});

it('errors on invalid component', () => {
  expect(() => {
    two({}, {});
  }).toThrow(/react component instance/);

  expect(() => {
    two({render: () => {}}, {});
  }).toThrow(/react component instance/);

  expect(() => {
    two({setState: () => {}}, {});
  }).toThrow(/react component instance/);

  expect(() => {
    two({render: 'no a function', setState: 'not a function'}, {});
  }).toThrow(/react component instance/);
});

it('render calls through', () => {
  const render = jest.fn(() => <div />);
  const inst = {render, setState: () => {}};
  two(inst, {});
  expect(inst.render).not.toBe(render);

  inst.render();
  expect(render).toBeCalled();
});

