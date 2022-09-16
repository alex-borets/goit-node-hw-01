const contacts = require('./contacts.js');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const list = await contacts.listContacts();
      console.table(list);
      break;

    case 'get':
      const getById = await contacts.getContactById(id);
      console.log(getById);
      break;

    case 'add':
      const add = await contacts.addContact({ name, email, phone });
      console.log(add);
      break;

    case 'remove':
      const removeById = await contacts.removeContactById(id);
      console.log(removeById);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(options);
