import React, { PureComponent } from 'react';
import './Transfer.scss';
import ItemList from './ItemList';


// function not(a, b){
//   //return a.filter((value) => b.indexOf(value) === -1);
//   return a.filter(n => b.some(n2 => n.id === n2.id));
// }

// function intersection(a, b){
//   //return a.filter((value) => b.indexOf(value) !== -1);

//   return a.filter(n => !b.some(n2 => n.id === n2.id));

// }

// util fn for intersection and difference
function arrayModifier(arr, arr1, operation) {
  let result = [], tempArr = [];

  // swap the array if required, based on the operation.
  if (operation && arr1.length > arr.length) {
    tempArr = [...arr1];
    arr1 = [...arr];
    arr = tempArr;
  } else if (!operation && arr1.length < arr.length) {
    tempArr = [...arr1];
    arr1 = [...arr];
    arr = tempArr;
  }

  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr1.length; ++j) {
      if (arr[i].id === arr1[j].id) {
        if (operation) {
          result.push(arr[i]);
        } else {
          arr1.splice(j, 1);
          --j;
        }
      }
    }
  }

  if (!operation) {
    return result.concat(arr1);
  }

  return result;
}

let placeholder = document.createElement("li");
placeholder.className = "placeholder";

class Transfer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      source: props.data,
      target: [],
      checkedItem: []
    };

  }

  handleCheckbox = (value) => {
    // finding if item is already in checkedlist
    let index = -1;
    for (let i = 0; i < this.state.checkedItem.length; ++i) {
      if (this.state.checkedItem[i].id === value.id) {
        index = i;
        break;
      }
    }

    const checkedList = [...this.state.checkedItem];

    if (index < 0) {
      checkedList.push(value);
    } else {
      checkedList.splice(index, 1);
    }

    this.setState({
      checkedItem: checkedList
    });
  }

  handleCheckedRight = () => {

    let leftChecked = arrayModifier(this.state.source, this.state.checkedItem, true);
    let notChecked = arrayModifier(this.state.source, this.state.checkedItem, false);

    this.setState({
      target: this.state.target.concat(leftChecked),
      source: notChecked,
      checkedItem: []
    })
  };

  handleCheckedLeft = () => {

    let rightChecked = arrayModifier(this.state.target, this.state.checkedItem, true);
    let notChecked = arrayModifier(this.state.target, this.state.checkedItem, false);

    this.setState({
      source: this.state.source.concat(rightChecked),
      target: notChecked,
      checkedItem: []
    })
  };

  render() {

    return (
      <div className="wrapper">
        <ItemList
          handleCheckbox={this.handleCheckbox}
          items={this.state.source}
          allItems={this.props.data}
          checkboxState={this.state.checkedItem}
        />

        <div className="arrow-wrapper">
          <div className="arrow-box" onClick={this.handleCheckedRight}>
            <div className="arrow arrow-left" ></div>
          </div>
          <div className="arrow-box" onClick={this.handleCheckedLeft}>
            <div className="arrow arrow-right"></div>
          </div>
        </div>

        <ItemList
          handleCheckbox={this.handleCheckbox}
          items={this.state.target}
          allItems={this.props.data}
          checkboxState={this.state.checkedItem}

        // handleOnDragEnd = {this.dragEnd.bind(this)}
        // handleOnDragStart = {this.dragStart.bind(this)}
        // handleOnDragOver = {this.dragOver.bind(this)}
        // dataIndex = {this.props.data.name}
        />
      </div>

    )
  }

}

export default Transfer;