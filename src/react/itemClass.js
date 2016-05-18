import React from 'react';

export default class Item extends React.Component {

  render() {
    const { str, int } = this.props.item
    return (
      <li>
        <div className="row">
          <span className="str">{str}</span>
          <span className="int">{int}</span>
        </div>
      </li>
    )
  }

  // Only really helpfull when not
  // all list items are updated
  shouldComponentUpdate(newProps) {
    return this.props.item !== newProps.item
  }
}
