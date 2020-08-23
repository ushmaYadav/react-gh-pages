import React from "react";
import SingleItem from "../components/SingleItem";

class ItemList extends React.Component {

   
  render() {
    let itemArr = this.props.items;

    if(itemArr.length === 0){
      return <ul className= "list" onDragOver={this.props.handleOnDragOver}></ul>;
    }
  
    let handleCheckbox = this.props.handleCheckbox;
    let checkboxState = this.props.checkboxState;

    let listItems = itemArr.map((itemObj, i) => {
      // if (!myItems.includes(itemObj.id)) return null;
      return (
        
        <SingleItem
          key={itemObj.id}
          data={itemObj}
          onClick={() => handleCheckbox(itemObj)}
          checkedValue= {checkboxState.filter(item => (item.id === itemObj.id)).length > 0}
          // onChangeCheckbox={() => handleCheckbox(itemObj.id)}
          // handleOnDragEnd={this.props.handleOnDragEnd}
          // handleOnDragStart={this.props.handleOnDragStart}
          // dataIndex = {i}
        />
      );
    });

    return <ul className= "list" onDragOver={this.props.handleOnDragOver}>{listItems}</ul>;
  }
}

export default ItemList;
