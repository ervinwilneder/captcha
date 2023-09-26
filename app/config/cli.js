// Dependencies
const { ArgumentParser } = require('argparse');

// Set arguments for CLI
const parser = new ArgumentParser();

parser.add_argument('--dummy', {
    help: 'Dummy argument',
    action: 'store_true'
});

// Export parser variable
module.exports = { parser };