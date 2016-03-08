const Factory = require('rosie').Factory;

Factory.define('user')
  .sequence('name', id => `Bob ${id}`);
