
Two way binding in a react friendly way

## Example

react-two modifies your component, intercepts the render output. It adds and removes props
from the elements. Here's a minimal example:

```js
import two from 'react-two';

class Myform extends React.Component {
  constructor() {
    super();
    this.state = {foo: 'initial value'};
    two(this, {});
  }
  render() {
    return <input $bind="state.foo" />;
  }
}
```

TODO: add more docs. For now see the concept in [the react-sec gist][1].

[1]: https://gist.github.com/brigand/12795f3a1b8b75d6b15e23cf89e72e51#renderbind

## Install

```
npm install --save react-two
# or
yarn add react-two
```

## Development

Source files are in the `src` directory.

The tests are run by jest. To run the tests use `npm run test` or `npm run test -- --watch`.

To build the project, run `npm run build`. 

Run `npm run test` without watch mode before sending a PR. If snapshots need updates,
run `npm run test -- -u`.

