const Factory = require('rosie').Factory;

Factory.define('person')
  .sequence('name', id => `Bob ${id}`);
