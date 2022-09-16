const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

const reWriteFile = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find(item => item.id === String(contactId));
  return contactById || null;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: String(contacts.length + 1),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await reWriteFile(contacts);
  return newContact;
}

async function removeContactById(contactId) {
  const list = await listContacts();
  const index = list.findIndex(item => item.id === String(contactId));
  if (index === -1) {
    return null;
  }
  const [updatedContacts] = list.splice(index, 1);
  await reWriteFile(list);
  return updatedContacts;
}

// const updateById = async (contactId, { name, email, phone }) => {
//   const contacts = await contacts.listContacts;
//   const index = contacts.findIndex((item = item.id === String(contactId)));
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, name, email, phone };
//   await reWriteFile(contacts);
//   return contacts[index];
// };

module.exports = { listContacts, getContactById, removeContactById, addContact };
