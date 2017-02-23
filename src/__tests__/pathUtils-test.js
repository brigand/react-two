const {readFromPath, updateFromPath} = require('../pathUtils.js');

describe('readFromPath', () => {
  it('works', () => {
    const re1 = readFromPath({x: {y: 1}}, 'x.y');
    expect(re1).toBe(1);
    const res2 = readFromPath({x: {y: {z: 1}}}, 'x.y.z');
    expect(res2).toBe(1);
  });
});

describe('updateFromPath', () => {
  it('works', () => {
    const input = {x: {y: {z: 1}}};
    const res = updateFromPath(input, 'x.y.z', 2);
    expect(res).toEqual({x: {y: {z: 2}}});
  });

  it('doesn\'t mutate', () => {
    const input = {x: {y: {z: 1}}};
    const res = updateFromPath(input, 'x.y.z', 2);
    expect(input).not.toBe(res);
    expect(input.x).not.toBe(res.x);
    expect(input.x.y).not.toBe(res.x.y);
  });
});

