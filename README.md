# yoke

> preprocessor for simple file concatenation.

Yoke is a declarative way to concatenate files for Front-End development. Within a `.yoke` file, list the files you would like put together.

## Example

Inside a `bundle.js.yoke` list the files you want concatenated together.

    js/license.js
    js/angular.js
    js/persona.js
    js/swipe.js
    js/app.js

Yoke fetches the content of all those files (in parallel) and merges them together preserving the order.

### CLI

The `yoke` command outputs a stream with the concatenated output.

    `yoke bundle.js.yoke`

To save, simply pipe the output to a destination file `yoke bundle.js.yoke > bundle.js`
