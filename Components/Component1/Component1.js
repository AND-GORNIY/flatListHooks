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
import {generateKey} from '../utils/generateKey';

class Component1 extends React.Component {
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
      <View style={styles.viewStyle}>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{
            flex: 0,
            width: '90%',
            alignItems: 'stretch',
            alignSelf: 'center',
          }}
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
            value={textInput}
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
    alignSelf: 'center',
  },
  flatListStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textInputStyle: {
    width: '80%',
    height: 30,
    backgroundColor: '#dbffff',
    marginLeft: 10,
    borderRadius: 10,
  },
  textInputLine: {
    flex: 0.15,
    width: '90%',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
  },
  button: {
    flex: 1,
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
    alignItems: 'flex-end',
  },
});
export default Component1;
