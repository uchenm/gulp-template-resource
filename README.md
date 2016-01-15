## Install

Install with [npm](https://npmjs.org/package/gulp-template-resource)

```
npm install gulp-template-resource --save-dev
```

## Example

**gulpfile.js**

> Concatenate the contents of all .json-files/html files specified and save to a target file .

```js
var templateResource = require('gulp-template-resource');

gulp.task('default', function () {
  return gulp.src('templates/**/*.json')
    .pipe(templateResource())
    .pipe(gulp.dest('public'));
});
```

**Result (_public/templates.js_)**

> Sample output (prettified).

```js
angular.module("templates").run([$templateCache,
  function($templateCache) {
    $templateCache.put("template1.json",
      {"a":"aaaaaaa"}
    );
    $templateCache.put("template2.json",
      {"b":"bbbbbb"}
    );
    // etc.
  }
]);

```


or you can put a bunch of html files into a single html template file:

a.html

<div>
    aaaaaa
</div>

b.html

<div>
    <label class="col-md-2 control-label">bbbbbb</label>
</div>

gulp.src('templates/**/*.html').pipe(templateResource('templates.html', {
    "standalone": true,
    "templateBody": "<script type=\"text/ng-template\" id=\"<%= url %>\">\n\n<%= contents %>\n\n</script>",
    "templateHeader": " ",
    "templateFooter": " "
})).pipe(gulp.dest('output'));

templates.html:

<script type="text/ng-template" id="a.html">

    <div>
        aaaaaa
    </div>

</script>
<script type="text/ng-template" id="b.html">

    <div>
        <label class="col-md-2 control-label">bbbbbb</label>
    </div>

</script> 

## License

The MIT License (MIT)

Copyright (c) 2014 [Ming](https://github.com/uchenm/)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.