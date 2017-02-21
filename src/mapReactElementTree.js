const React = require('react');
const {map} = React.Children;

const mapReactElementTree = (node, callback) => {
  if (typeof node !== 'object' || node === null) return node;

  const node2 = callback(node);
  if (node2 == null) {
    throw new Error(`mapReactElementTree: the callback returned ${node2}`);
  }

  const children = map(node2.props.children, (subnode) => {
    return mapReactElementTree(subnode, callback);
  });
  return React.cloneElement(node2, {children});
};

module.exports = mapReactElementTree;

