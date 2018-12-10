export default const Realm = require('realm');

const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string'
  }
};

// schemaVersion defaults to 0
Realm.open({schema: [PersonSchema]});