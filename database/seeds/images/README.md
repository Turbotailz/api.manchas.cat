# How to bulk load images
Simply place images in the `database/seeds/images` folder to seed them. The order images are uploaded cannot be guaranteed because of how [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) works.
For best results, make sure your images have the EXIF metadata `DateTimeOriginal`.
