import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native';

import Button from './src/componentes/Button'
import Display from './src/componentes/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  index: 0,
}

export default class App extends Component {
  { /* Iniciando o estado inicial */ }
  state = { ...initialState }
  
  { /* Receber a entrada */ }
  addDigit = n => {
    { /* Verificar os casos para limpar o display: quando for digitado algum valor diferente de 0, ou quando for chamado a função clearMemory  */ }
    const clearDisplay = this.state.displayValue === '0' 
      || this.state.clearDisplay
    
    { /* Verificação do ponto (.), permitir 1 ponto por valor */ }
    if(n === '.' &&  !clearDisplay && this.state.displayValue.includes('.')) {
      return
    }
    { /* IndexValue é valor que está no display, se precisar limpar o display, o valor fica vazio */ }
    const indexValue = clearDisplay ? '' : this.state.displayValue
    { /* Concatenar os valores */ }
    const displayValue = indexValue + n
    { /* Mostrar o valor no display */ }
    this.setState({ displayValue, clearDisplay: false })

    if(n !== '.'){
      { /* Converte o valor para float */ }
      const newValue = parseFloat(displayValue)
      { /* Pegar os valores do array definido no estado inicial e setando para um novo array */ }
      const values = [...this.state.values]
      { /* Seta o valor do tipo float no novo array values */ }
      values[this.state.index] = newValue
      { /* Alterando o estado */ }
      this.setState({ values })
    }
  }

  clearMemory = () => {
    { /* Restaurando para o estado inicial */ }
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    { /* Caso inicial, quando o indíce é 0 */ }
    if(this.state.index === 0){
      { /* Setando o estado, mudando o valor de index para 1, que será armazenado o próximo valor, limpando o display */ }
      this.setState({ operation, index: 1, clearDisplay: true })
    
      { /* Quando o índice é 1 */ }
    } else {
      { /* Verificar se a operação é de igual */ }
      const equals = operation === '='
      { /* Pegar os valores do array definido no estado inicial e setando para um novo array */ }
      const values = [...this.state.values]
      
      try {
        { /* Realiza a operação, e armazena na posição 0 do array criado acima */ }
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (e) {
        { /* Quando o operation for "=", o eval apresentará um erro */ }
        values[0] = this.state.values[0]
      }
      { /* Sempre que for setado uma operação, o valor da posição 1 é zerado, para realizar outras operações */ }
      values[1] = 0
      
      { /* Alterando o estado, mostrando na tela o resultado */ }
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
