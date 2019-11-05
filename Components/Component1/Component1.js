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
import {useComponent1} from './useComponent1';

const Component1 = () => {
  const {
    localState,
    handleSwitch,
    pressSave,
    pressEdit,
    disableEdit,
    setText,
  } = useComponent1();
  const {textInput, data} = localState;
  // console.log(data);
  return (
    <View style={styles.viewStyle}>
      <FlatList
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}
        contentContainerStyle={styles.contentContainerStyle}
        data={data}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <FlatlistItem
            name={item.name}
            isSelected={item.isSelected}
            handleSwitch={handleSwitch}
            id={item.key}
          />
        )}
      />

      <View style={styles.textInputLine}>
        <Text>Name:</Text>
        <TextInput
          style={styles.textInputStyle}
          value={textInput}
          onChangeText={setText}
        />
      </View>

      <View style={styles.buttonLine}>
        <TouchableOpacity
          style={styles.button}
          onPress={pressSave}
          disabled={textInput.length > 0 ? false : true}>
          <Text style={styles.textButton}> Save </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={pressEdit}
          disabled={disableEdit(data)}>
          <Text style={styles.textButton}> Edit </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Component1;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignSelf: 'center',
  },
  contentContainerStyle: {
    flex: 0,
    width: '90%',
    alignItems: 'stretch',
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
