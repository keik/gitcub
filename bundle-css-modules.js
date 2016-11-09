#!/usr/bin/env node

const chokidar = require('chokidar')
const flatten = require('lodash/flatten')
const fs = require('fs')
const glob = require('glob')
const postcss = require('postcss')
const stream = require('stream')

const argv = require('minimist')(process.argv.slice(2), {
  boolean: ['h', 'v', 'w'],
  alias: {h: 'help', o: 'outpfile', v: 'verbose', w: 'watch'}
})

const froms = argv._

if (argv.h)
  process.exit(__help())

if (argv.w)
  chokidar.watch(froms).on('change', (file) => __process(file, argv.o))

const runner = postcss([
  require('postcss-modules')({
    generateScopedName: '[name]__[local]___[hash:base64:5]',
    getJSON: function() {},
  }),
])

Promise
  .all(froms.map(p =>
    new Promise((resolve) => glob(p, (e, files) => resolve(files)))
  ))
  .then(files => __process(flatten(files), argv.o))
  .catch(err => {
    console.error(err)
  })

const __cache = {}
function __process(files, to) {
  const s = Number(new Date())
  files = Array.isArray(files) ? files : [files]

  function __reduceCache(resultsByFroms) {
    return resultsByFroms.reduce((acc, result) => {
      acc[result.opts.from] = result.css
      return acc
    }, __cache)
  }

  function __bundle(cache) {
    const build = Object.keys(cache).map(k => `/* ${k} */\n\n${cache[k]}`).join('\n')
    const p = new stream.PassThrough()
    p.end(new Buffer(build))
    p.pipe(to ?
      fs.createWriteStream(to)
        .on('close', function() {
          if (argv.v) console.log(`${this.bytesWritten} bytes written to ${to} (${((Number(new Date()) - s) / 1000).toFixed(2)} seconds)`)
        }) :
      process.stdout)
  }

  return Promise
    .all(files.map(from =>
      runner.process(fs.readFileSync(from), {from, to})
    ))
    .then(__reduceCache)
    .then(__bundle)
}

function __help() {
  console.log(`Usage: bundle-css-modules [CSS files (glob)] {OPTIONS}

     --help, -h  Show this mesage.

  --outfile, -o  Filename to write bundles.
                 If unspecified, bundles were prited to stdout.

  --verbose, -v  Run as verbose mode.

    --watch, -w  Run as watch mode that watch changes on files
                 and re-bundle.
`)
}
