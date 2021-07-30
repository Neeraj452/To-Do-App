// import React,{useState} from 'react';
// import './App.css';
// import './index.css';

//  const App =()=>
//  {
//    const [inputList, setInputList] = useState("");
//    const [Items, setItems] = useState([]);
//    const itemEvent = (event) =>{
//     setInputList(event.target.value)
//    }
//     const listOfItems = () =>
//     {
//     setItems((oldItems) => {
//       return [oldItems,inputList];
//     });
//     };

   
//    return(
//    <>
//    <div className="main_div">
//      <div className="center_div">
//        <br/>
//        <h1>To DO List</h1>
//        <br/>
//        <input type="text" placeholder='Add a item' onChange={itemEvent}/>
//        <button onClick = {listOfItems}>+</button>
//        <ul>
//        { Items.map((intemval) => {
//           return <li> {intemval} </li>;
//           })} 
//        </ul>
//      </div>
//    </div>
//    </>)
//  }
// export default App;


import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ListItems from './ListItems.js'



library.add(faTrash)

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        key:''
      }
    })
    }
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }
  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
    
   
  }
 render(){
  return (
    <div className="App">
      <header>
        <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter task" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">Add</button>
        </form>
        <p>{this.state.items.text}</p>
        
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
        
      </header>
    </div>
  );
 }
}

export default App;
