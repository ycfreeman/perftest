import React from 'react';

export default (props) => {
  const { str, int } = props.item
  return (
    <li>
      <div className="row">
        <span className="str">{str}</span>
        <span className="int">{int}</span>
      </div>
    </li>
  )
}