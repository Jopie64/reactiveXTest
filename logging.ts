
let logging = '';

function log(s) {
    logging += s + '\n';
    console.log(s);
}

log('***');
log('*** Program started ***');
log('***');

export { log, logging };
