import React from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';

class FlatlistItem extends React.PureComponent {
  render() {
    const {name, isSelected, handleSwitch, id} = this.props;
    return (
      <View style={styles.listElement}>
        <Text>Name: {name} </Text>
        <Switch value={isSelected} onValueChange={handleSwitch(id)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listElement: {
    flex: 1,
    padding: 5,
    margin: 5,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 20,
  },
});
export default FlatlistItem;
