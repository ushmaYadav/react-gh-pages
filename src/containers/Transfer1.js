import React, { PureComponent } from 'react';
import './Transfer.scss';
import SingleItem from '../components/SingleItem';


function not(a, b){
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b){
  return a.filter((value) => b.indexOf(value) !== -1);
}

let placeholder = document.createElement("li");
placeholder.className = "placeholder";

class Transfer extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      source: props.data.map((item) => item.id),
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
    debugger;
    let leftChecked = intersection(this.state.checkedItem, this.state.source);

    console.log('checked items is' +this.state.checkedItem);

    this.setState({
      target: this.state.target.concat(leftChecked),
      source: not(this.state.source, leftChecked),
      checkedItem: not(this.state.checkedItem, leftChecked)
    })

    console.log('dhd source' + this.state.source);
    console.log('dhd right' + this.state.target);
    console.log('dhd checkedItem' + this.state.checkedItem);

  };

  handleCheckedLeft = () => {
    debugger;
    let rightChecked = intersection(this.state.checkedItem, this.state.target);

    console.log('checked items is' +this.state.checkedItem);

    this.setState({
      source: this.state.source.concat(rightChecked),
      target: not(this.state.target, rightChecked),
      checkedItem: not(this.state.checkedItem, rightChecked)
    })

    console.log('dhd1 source' + this.state.source);
    console.log('dhd1 right' + this.state.target);
    console.log('dhd1 checkedItem' + this.state.checkedItem);
  };

  customList = (items) => {

    debugger;

    items.map((itemObj, i) => {
      //console.log('my items is' +myItems);
      
      //if (!items.includes(itemObj.id)) return null;

      return (
        <SingleItem
          key={itemObj.id}
          data={itemObj}
          // onClick={() => this.handleCheckbox(itemObj.id)}
          //checkedValue= {this.state.checkedItem.indexOf(itemObj.id) !== -1}
        />
      );
      });
    
  };


  render(){
    
    return(
      <div className="wrapper">
       <div>{this.customList(this.state.source)}</div>

        <div className="arrow-wrapper">
          <div className="arrow-box" onClick={this.handleCheckedRight}>
            <div className="arrow arrow-left" ></div>
          </div>
          <div className="arrow-box" onClick={this.handleCheckedLeft}>
            <div className="arrow arrow-right"></div>
          </div>
        </div>

        <div>{this.customList(this.state.target)}</div>
      </div>
     
    )
  }

}

export default Transfer;