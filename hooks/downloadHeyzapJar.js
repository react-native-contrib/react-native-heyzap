#!/usr/bin/env node

'use strict';

const AdmZip = require('adm-zip');
const path = require('path');
const http = require('http');
const url = require('url');

const fileUrl = 'https://d2jks9au6e6w94.cloudfront.net/sdk/heyzap-ads-sdk-9.5.7.zip';

const sourceFile = 'heyzap-ads-sdk-9.5.7/android-sdk/heyzap-ads-sdk-9.5.7.jar';
const outputDir  = path.join(__dirname, '..', 'android', 'libs');

var options = {
    host: url.parse(fileUrl).host,
    port: 80,
    path: url.parse(fileUrl).pathname
};

http.get(options, function(res) {
    var data = [], dataLen = 0;

    res.on('data', function(chunk) {

            data.push(chunk);
            dataLen += chunk.length;

        }).on('end', function() {
            var buf = new Buffer(dataLen);

            for (var i = 0, len = data.length, pos = 0; i < len; i++) {
                data[i].copy(buf, pos);
                pos += data[i].length;
            }

            var zip = new AdmZip(buf);
            zip.extractEntryTo(sourceFile, outputDir, false, true);
        });
});
