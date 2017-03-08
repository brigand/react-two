// reads from a user provided path
// if fallback is omitted, an error will be thrown if a path doesn't exist
const omittedFallbackSentenial = {};
exports.readFromPath = (obj, path, fallback = omittedFallbackSentenial) => {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    const isLast = i === parts.length - 1;
    const hasFallback = fallback !== omittedFallbackSentenial;
    if (current[part] === undefined && !isLast && !hasFallback) {
      const currentParts = parts.slice(0, i);
      throw new ReferenceError(`react-two: encountered an undefined while processing bind path. '${currentParts}' is undefined. Full path is '${path}'`);
    } else if (hasFallback && !isLast && current[part] === undefined) {
      return fallback;
    }

    current = current[part];
  }
  return current;
};

// does an immutable update on a path
exports.updateFromPath = (obj, path, value) => {
  const parts = Array.isArray(path) ? path : path.split('.');
  const root = exports.clone(obj);
  let current = root;
  parts.forEach((part, i) => {
    const isLast = i === parts.length - 1;
    if (!isLast) {
      if (current[part] === undefined) {
        const currentParts = parts.slice(0, i);
        throw new ReferenceError(`react-two: encountered an undefined while processing bind path during an update. '${currentParts}' is undefined. Full path is '${path}'`);
      }
      const copy = exports.clone(current[part]);
      current[part] = copy;
      current = copy;
    } else {
      current[part] = value
    }
  });
  return root;
};

// generic minimal clone utility
exports.clone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.slice();
  return Object.assign({}, obj);
};

