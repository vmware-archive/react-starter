const React = require('react');

const Hello = ({person: {name}}) => {
  return (
    <div>{`Hello ${name}`}</div>
  )
};

module.exports = Hello;
