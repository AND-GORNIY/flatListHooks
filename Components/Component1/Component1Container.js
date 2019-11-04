import React from 'react';
import {generateKey} from '../utils/generateKey';
import Component1 from './Component1';

class Component1Container extends React.Component {
  state = {
    data: [],
    textInput: '',
  };

  makeRequest = () => {
    fetch('https://randomuser.me/api/?results=15&inc=name')
      .then(res => res.json())
      .then(res => {
        this.makeArray(res);
      });
  };

  makeArray = resultRequest => {
    const array = resultRequest.results.map(item => {
      return {
        name: item.name.first,
        key: generateKey(),
        isSelected: false,
      };
    });
    this.setState({data: array});
  };

  setText = textInput => {
    this.setState({textInput});
  };

  pressSave = () => {
    let array = this.state.data;
    let newObject = {
      name: this.state.textInput,
      key: generateKey(),
      isSelected: false,
    };
    array.push(newObject);
    this.setState({data: array, textInput: ''});
  };

  pressEdit = () => {
    let array = this.state.data;
    let arrayChange = array.filter(item => {
      return item.isSelected === false;
    });
    this.setState({data: arrayChange});
  };

  disableEdit = data => {
    if (data.length === 0) {
      return true;
    }
    let a = data.findIndex(item => {
      return item.isSelected === true;
    });
    return a === -1 ? true : false;
  };

  handleSwitch = key => {
    return value => {
      let array = this.state.data;
      let index = array.findIndex(item => {
        return item.key === key;
      });
      array[index].isSelected = value;
      this.setState({data: array});
    };
  };

  componentDidMount() {
    this.makeRequest();
  }

  render() {
    const {data, textInput} = this.state;
    return (
      <Component1
        data={data}
        textInput={textInput}
        handleSwitch={this.handleSwitch}
        disableEdit={this.disableEdit}
        pressSave={this.pressSave}
        pressEdit={this.pressEdit}
      />
    );
  }
}

export default Component1Container;
