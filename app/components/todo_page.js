const React = require('react');
const types = require('react').PropTypes;
const {Input} = require('pui-react-inputs');
const {DefaultButton} = require('pui-react-buttons');

class TodoPage extends React.Component {
  static propTypes = {
    config: types.object,
    todoItems: types.array
  };

  render() {
    return (<div>
      <h1>You might not need grids, this is all flexbox</h1>
      <h2>Equal Widths: (flex: 1;)</h2>
      <div className="flex-container">
        <div className="grid-markings flex-1 phm">Contact Info:</div>
        <div className="grid-markings flex-1 phm"><Input placeholder="Type email here"/></div>
        <div className="grid-markings flex-1 phm"><Input placeholder="Phone Number"/></div>
        <div className="grid-markings flex-1 phm"><DefaultButton>Submit</DefaultButton></div>
      </div>

      <h2>Vertical Centering: (flex-direction: row; align-items: center;)</h2>
      <div className="flex-row-center">
        <div className="grid-markings phm">Contact Info:</div>
        <div className="grid-markings phm"><Input className="mbn" placeholder="Type email here"/></div>
        <div className="grid-markings phm"><Input className="mbn" placeholder="Phone Number"/></div>
        <div className="grid-markings phm"><DefaultButton>Submit</DefaultButton></div>
      </div>


      <h2>Stuff on the right (flex: 1; text-align: right;)</h2>
      <div className="flex-container">
        <div className="grid-markings phm">Contact Info:</div>
        <div className="grid-markings phm"><Input className="mbn" placeholder="Type email here"/></div>
        <div className="grid-markings phm"><Input className="mbn" placeholder="Phone Number"/></div>
        <div className="grid-markings flex-1 txt-r phm"><DefaultButton>Submit</DefaultButton></div>
      </div>

      <h2>Stuff on the right (justify-content: space-between;)</h2>
      <div className="flex-space-between">
        <div className="flex-container">
          <div className="grid-markings phm">Contact Info:</div>
          <div className="grid-markings phm"><Input className="mbn" placeholder="Type email here"/></div>
          <div className="grid-markings phm"><Input className="mbn" placeholder="Phone Number"/></div>
        </div>
        <div className="grid-markings phm"><DefaultButton>Submit</DefaultButton></div>
      </div>
    </div>);
  }
}

module.exports = TodoPage;
