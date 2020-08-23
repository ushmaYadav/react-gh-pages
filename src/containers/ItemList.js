import React from "react";
import SingleItem from "../components/SingleItem";

class ItemList extends React.Component {

   
  render() {
    let itemArr = this.props.items;
    // let myItems = this.props.items;

    console.log(itemArr);
    
    if(itemArr.length === 0){
      return null
    }
  
    let handleCheckbox = this.props.handleCheckbox;
    let checkboxState = this.props.checkboxState;

    let listItems = itemArr.map((itemObj, i) => {
      // if (!myItems.includes(itemObj.id)) return null;
      console.log("item obj is" +itemObj);
      return (
        
        <SingleItem
          key={itemObj.id}
          data={itemObj}
          onClick={() => handleCheckbox(itemObj.id)}
          checkedValue= {checkboxState.indexOf(itemObj.id) !== -1}
          onChangeCheckbox={() => handleCheckbox(itemObj.id)}
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
