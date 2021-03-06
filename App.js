import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Component1Container from './Components/Component1';

class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.app}>
        <Component1Container />
      </SafeAreaView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#a7ffeb',
  },
});
