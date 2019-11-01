import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FlatlistItem from '../FlatlisItem';

class Component1 extends React.Component {
  state = {
    data: [],
    textInput: '',
  };

  makeRequest = () => {
    fetch('https://randomuser.me/api/?results=3&inc=name')
      .then(res => res.json())
      .then(res => {
        this.makeArray(res);
      });
  };

  generateKey = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // eslint-disable-next-line no-bitwise
      let r = (Math.random() * 16) | 0,
        // eslint-disable-next-line no-bitwise
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  makeArray = resultRequest => {
    const array = resultRequest.results.map(item => {
      return {
        name: item.name.first,
        key: this.generateKey(),
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
      key: this.generateKey(),
      isSelected: false,
    };
    array.push(newObject);
    this.setState({data: array});
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
    console.log('1', this.state.data);
    let arrayChange = this.state.data;
    let index = arrayChange.findIndex(item => {
      return item.key === key;
    });
    return value => {
      // console.log('2', arrayChange);
      let arrayChange1 = this.state.data;
      arrayChange1[index].isSelected = value;
      this.setState({data: arrayChange1});
    };
  };

  componentDidMount() {
    this.makeRequest();
  }

  render() {
    const {data, textInput} = this.state;
    console.log('3', data);
    return (
      <View style={styles.viewStyle}>
        <FlatList
          style={styles.flatListStyle}
          data={data}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <FlatlistItem
              name={item.name}
              isSelected={item.isSelected}
              handleSwitch={this.handleSwitch}
              id={item.key}
            />
          )}
        />

        <View style={styles.textInputLine}>
          <Text>Name:</Text>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={this.setText}
          />
        </View>

        <View style={styles.buttonLine}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.pressSave}
            disabled={textInput.length > 0 ? false : true}>
            <Text style={styles.textButton}> Save </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.pressEdit}
            disabled={this.disableEdit(data)}>
            <Text style={styles.textButton}> Edit </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    height: 100,
  },
  flatListStyle: {
    width: '100%',
  },
  textInputStyle: {
    width: '80%',
    height: 30,
    backgroundColor: '#dbffff',
    marginLeft: 10,
    borderRadius: 10,
  },
  textInputLine: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75ccb9',
    width: 135,
    height: 45,
    borderRadius: 60,
  },
  textButton: {
    fontSize: 25,
  },
  buttonLine: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
export default Component1;
