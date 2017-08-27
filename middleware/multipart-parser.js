// recieve multipart/form
// without files

// for routes which require custom file handling
// can introduce config to ignore them here

const busboy = require('co-busboy');
const convert = require('koa-convert');
const fs = require('fs');


exports.init = app => app.use(convert(function * (next) {
  if (!this.request.is('multipart/*')) {
    return yield * next;
  }

  const parser = busboy(this, { autoFields: true });

  let fileStream;

  while (fileStream = yield parser) {
    // filesStream - stream with file
    // autoFields => part is a file
    // specific handlers know how to handle the file, not us
    // alt: can auto-save to disk
    // this.throw(400, 'Files are not allowed here');

    // fileStream.pipe(fs.createWriteStream(`public/uploads/${fileStream.filename}`));
    // console.log(fileStream);
    console.log(fileStream.fieldname, fileStream.filename, fileStream.encoding, fileStream.mime);
    fileStream.resume();
  }

  // copy normal fields from parser to ctx.request.body
  const body = this.request.body;

  for (let [name, val] of parser.fields) {
    if (body[name]) {
      if (!Array.isArray(body[name])) body[name] = [body[name]];
      body[name].push(val);
    } else {
      body[name] = val;
    }
  }

  console.log(parser);

  yield * next;
}));
