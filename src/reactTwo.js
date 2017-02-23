const React = require('react');
const mapReactElementTree = require('./mapReactElementTree.js');

// inst is a react component instance
const reactTwo = (inst, opts) => {
  if (typeof inst.render !== 'function' || typeof inst.setState !== 'function') {
    throw new TypeError(`react-two: expected first argument to be a react component instance.`);
  }

  if (typeof opts !== 'object' || opts === null) {
    throw new TypeError(`react-two: expected opts (2nd arg) to be an object but got "${opts}"`);
  }

  const originalRender = inst.render;
  inst.render = () => {
    const root = originalRender.call(inst);
    if (root === undefined) {
      throw new TypeError(`Expected instance.render to return a node but got "${originalRender}"`);
    }
    return mapReactElementTree(root, (node) => {
      if (node.props.$bind) {
        const path = node.props.$bind;
        const newProps = {
          $bind: undefined,
          value
        };
        return React.cloneElement(node, newProps);
      }
      return node;
    });
  };

  const twoObj = {};

  twoObj.watchers = [];
  twoObj.watch = (key, callback) => {
    if (typeof key !== 'string') {
      throw new TypeError(`two.watch: expected key to be a string but got ${key}`);
    }
    if (typeof callback !== 'function') {
      throw new TypeError(`two.watch: expected callback to be a function but got ${callback}`);
    }
    twoObj.watchers.push({key, callback});
  };

  return twoObj;
};

module.exports = reactTwo;

