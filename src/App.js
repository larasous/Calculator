import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native';

import Button from './componentes/Button'
import Display from './componentes/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  index: 0,
}

export default class App extends Component {
  
  state = { ...initialState }

  addDigit = n => {
    
    const clearDisplay = this.state.displayValue === '0' 
      || this.state.clearDisplay
    
    if(n === '.' &&  !clearDisplay && this.state.displayValue.includes('.')) {
      return
    }

    const indexValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = indexValue + n

    this.setState({ displayValue, clearDisplay: false })

    if(n !== '.'){
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.index] = newValue
      this.setState({ values })
    }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    if(this.state.index === 0){
      
      this.setState({ operation, index: 1, clearDisplay: true })

    } else {
      
      const equals = operation === '='
      const values = [...this.state.values]
      
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        index: equals ? 0 : 1,
        clearDisplay: true,
        values
      })
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label={'AC'} triple onClick={this.clearMemory} />
          <Button label={'/'} operation onClick={() => this.setOperation('/')} />
          
          <Button label={'7'} onClick={() => this.addDigit(7)} />
          <Button label={'8'} onClick={() => this.addDigit(8)} />
          <Button label={'9'} onClick={() => this.addDigit(9)} />
          <Button label={'*'} operation onClick={() => this.setOperation('*')} />
          
          <Button label={'4'} onClick={() => this.addDigit(4)} />
          <Button label={'5'} onClick={() => this.addDigit(5)} />
          <Button label={'6'} onClick={() => this.addDigit(6)} />
          <Button label={'-'} operation onClick={() => this.setOperation('-')} />
          
          <Button label={'1'} onClick={() => this.addDigit(1)} />
          <Button label={'2'} onClick={() => this.addDigit(2)} />
          <Button label={'3'} onClick={() => this.addDigit(3)} />
          <Button label={'+'} operation onClick={() => this.setOperation('+')} />
          
          <Button label={'0'} double onClick={() =>this.addDigit(0)} />
          <Button label={'.'} onClick={() => this.addDigit('.')} />
          <Button label={'='} operation onClick={() => this.setOperation('=')} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },

  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
  
});
