import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  UIManager
} from 'react-native';
import expressionCalculator from 'expression-calculator'
const calc = new expressionCalculator()
import thisStyles from './components/styles'

UIManager.setLayoutAnimationEnabledExperimental(true)
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      resultText: '',
      calculationText: '',
      calculating: 0
    }
  }
  componentWillUpdate() {
    const animationConfig = {
      duration: 500,
      create: {
        duration: 100,
        type: LayoutAnimation.Types.easeOut,
        property: 'opacity',
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.4,
        property: LayoutAnimation.Properties.scaleXY,
      },
      delete: {
        duration: 100,
        type: LayoutAnimation.Types.easeOut,
        property: 'opacity',
      },
    }
    LayoutAnimation.configureNext(animationConfig);
  }
  render() {
    const styles = thisStyles(this)
    const onHold = () => {

      this.setState({
        resultText: '',
        calculationText: '',
        calculating: 0
      })
    }
    // <-------------- Calculate Result --------------> //
    const calculateResult = () => {
      const text = this.state.resultText
      const lastChar = this.state.resultText.split('').pop()
      if (text !== '' && lastChar !== '.') {
        const testOperator = text.slice(-1)
        if (operationsList.filter((el) => testOperator === el).length) {
          return false
        }
        this.setState({
          calculationText: calc.compile(text).calc(),
          calculating: 1
        })

      }
    }

    // <-------------- Button Press --------------> //
    const buttonPressed = (text) => {
      this.setState({
        calculating: 0
      })
      if (text === '=') {
        calculateResult()
        return
      }
      const lastChar = this.state.resultText.split('').pop()
      if (lastChar === '.' && text === '.') {
        return
      }
      if (text === '.' && (operationsList.indexOf(lastChar) > -1 || this.state.resultText === '')) {

        this.setState({
          resultText: this.state.resultText + '0' + text
        })
        return
      }
      if (text === '.') {
        let textArr = this.state.resultText.split('')
        do {
          const x = textArr.pop()
          if (operationsList.indexOf(x) > -1) {
            console.log('Dot added!', x)
            this.setState({
              resultText: this.state.resultText + text
            })
            return
          }
          if (x === '.') {
            console.log('Dot Detected', x)
            return
          }

        } while (textArr.length !== 0);
      }
      this.setState({
        resultText: this.state.resultText + text
      })

    }

    // <-------------- Operations --------------> //
    const operate = (operation) => {
      this.setState({
        calculating: 0
      })
      if (this.state.resultText !== '') { //Check if numbers where inserted before
        if (operation === operationsList[0]) { //Check if it is DELETE
          let text = this.state.resultText.split('')
          text.pop()
          this.setState({
            resultText: text.join('')
          })
        }
        else {
          const lastChar = this.state.resultText.split('').pop() // Disable multiple operators
          if (operationsList.indexOf(lastChar) > -1 || lastChar === '.') {
            return
          }
          this.setState({
            resultText: this.state.resultText + operation
          })
        }
      }
    }
    /*
    <==========================================>
    <                  Generators              >
    <==========================================>
    */
    function generateRows(columns, rows, values) {
      let tempColumns = []
      for (let i = 0; i < columns; i++) {
        let tempRows = []
        for (let j = 0; j < rows; j++) {
          tempRows.push(<TouchableOpacity style={styles().btn} key={'rows' + values[i][j]} onPress={() => buttonPressed(values[i][j])}>
            <Text style={[styles().btnText, styles().white]}>{values[i][j]}</Text>
          </TouchableOpacity>)
        }
        tempColumns.push(<View style={styles().row} key={'columns' + i}>{tempRows}</View>)
      }
      return tempColumns
    }
    function generateOperations(operators) {
      let renderedOperators = [], counter = 0
      operators.forEach((el, index) => {
        if (index === 0) {
          renderedOperators.push(<TouchableOpacity style={styles().btn} key={'operators' + index} onLongPress={() => onHold()} onPress={() => operate(operators[index])}>
            <Text style={[styles().btnText, styles().white]}>{el}</Text>
          </TouchableOpacity>)
        }
        else {
          renderedOperators.push(<TouchableOpacity style={styles().btn} key={'operators' + index} onPress={() => operate(operators[index])}>
            <Text style={[styles().btnText, styles().white]}>{el}</Text>
          </TouchableOpacity>)
        }
      })
      return renderedOperators
    }

    // <-------------- Component generators --------------> //
    const rowsList = [4, 3, [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]]
    const GeneratedRows = generateRows(...rowsList)
    const operationsList = ['DEL', '+', '-', '*', '/',]
    const GeneratedOperators = generateOperations(operationsList)

    return (
      <View style={styles().container}>
        <View style={styles().result}>
          <Text style={styles().resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles().calculation}>
          <Text style={styles().calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles().buttons}>
          <View style={styles().numbers}>
            {GeneratedRows}
          </View>
          <View style={styles().operations}>
            {GeneratedOperators}
          </View>
        </View>
      </View>
    );
  }
}
