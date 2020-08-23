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

function arrayModifier(arr, arr1, operation){
  let result = [];

  for(let i=0;i<arr.length;++i) {
    for(let j=0;j<arr1.length;++j) {
        if(arr[i].id === arr1[j].id) {
           if(operation){
              result.push(arr[i]);
            }else{
              arr.splice(i, 1);
            }

        }

    }
  }

  if(!operation){
    result.concat(arr);
  }

  return result;

}

let placeholder = document.createElement("li");
placeholder.className = "placeholder";

class Transfer extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      source: props.data,
      target: [],
      checkedItem: []
    };
    
  }
  
  handleCheckbox = (value) => {
    const currentIndex = this.state.checkedItem.indexOf(value);
    const checkedList = [...this.state.checkedItem];

    if (currentIndex === -1) {
      checkedList.push(value);
    } else {
      checkedList.splice(currentIndex, 1);
    }

    this.setState({
      checkedItem: checkedList 
    });
    
  }
  
  handleCheckedRight = () => {

    //let leftChecked = intersection(this.state.checkedItem, this.state.source);

    let leftChecked = arrayModifier(this.state.source, this.state.checkedItem, true)
    let notChecked = arrayModifier(this.state.source, this.state.checkedItem, false)

    this.setState({
      target: this.state.target.concat(leftChecked),
      source: notChecked,
      checkedItem: notChecked
    })

    // this.setState({
    //   target: this.state.target.concat(leftChecked),
    //   source: not(this.state.source, leftChecked),
    //   checkedItem: not(this.state.checkedItem, leftChecked)
    // })
  };

  handleCheckedLeft = () => {
    
    let rightChecked = intersection(this.state.checkedItem, this.state.target);

    console.log('checked items is' +rightChecked);

    this.setState({
      source: this.state.source.concat(rightChecked),
      target: not(this.state.target, rightChecked),
      checkedItem: not(this.state.checkedItem, rightChecked)
    })
  };



  render(){
    
    return(
      <div className="wrapper">
       <ItemList
          handleCheckbox={this.handleCheckbox}
          items={this.state.source}
          allItems={this.props.data}
          checkboxState = {this.state.checkedItem}
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
          items = {this.state.target}
          allItems = {this.props.data}
          checkboxState = {this.state.checkedItem}
         
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