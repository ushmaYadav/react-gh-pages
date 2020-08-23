import React from "react";

class SingleItem extends React.Component {
  render() {
    let data = this.props.data;

    return (
      <li onClick={this.props.onClick} 
      
      // draggable='true'
      // onDragEnd={this.props.handleOnDragEnd}
      // onDragStart={this.props.handleOnDragStart}
      // data-id={this.props.dataIndex}
      >
        
        <input type="checkbox" checked={this.props.checkedValue} onChange={() => {}}/>
        {/* onChange={this.props.onChangeCheckbox} */}
        <span> {data.name} </span>
        
        
      </li>
    );
  }
}

export default SingleItem;

