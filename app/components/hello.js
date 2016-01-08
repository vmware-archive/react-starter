/* eslint-disable no-unused-vars */
const React = require('react');
/* eslint-enable no-unused-vars */

const Hello = ({person: {name}}) => {
  return (
    <div className="hello">{`Hello ${name}`}</div>
  );
};

module.exports = Hello;
