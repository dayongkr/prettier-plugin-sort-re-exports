# prettier-plugin-sort-re-exports

A [Prettier](https://prettier.io/) plugin to sort re-exports.

This plugin is not just for sorting exports, but is specifically designed for situations where re-exports are used, such as in barrel files.

Therefore, it performs sorting based on the source, and in cases where separate grouping is required, it sorts only the connected code. For more details, refer to the [example](#example) below.

## Installation

```bash
npm install --save-dev prettier-plugin-sort-re-exports
```

## Configuration

Add the plugin to your `.prettierrc` or prettier configuration file:

```json
{
  "plugins": ["prettier-plugin-sort-re-exports"]
}
```

## Example

### Sorting re-exports

```javascript
// Before
export { a } from "./a/foo";
export { b } from "./a/bar";
export { c } from "./a/baz";

// After
export { b } from "./a/bar";
export { c } from "./a/baz";
export { a } from "./a/foo";
```

### Sorting re-exports with separate groups

```javascript
// Before
export { a } from "./a/foo";
export { b } from "./a/bar";
export { c } from "./a/baz";

export { d } from "./b/foo";
export { e } from "./b/bar";
export { f } from "./b/baz";

// After
export { b } from "./a/bar";
export { c } from "./a/baz";
export { a } from "./a/foo";

export { e } from "./b/bar";
export { f } from "./b/baz";
export { d } from "./b/foo";
```

### Sorting re-exports with separate groups and comments

```javascript
// Before
/**
 * Group A
 */
export { a } from "./a/foo";
export { b } from "./a/bar";
export { c } from "./a/baz";

/**
 * Group B
 */
export { d } from "./b/foo";
export { e } from "./b/bar";
export { f } from "./b/baz";

// After
/**
 * Group A
 */
export { b } from "./a/bar";
export { c } from "./a/baz";
export { a } from "./a/foo";

/**
 * Group B
 */
export { e } from "./b/bar";
export { f } from "./b/baz";
export { d } from "./b/foo";
```
