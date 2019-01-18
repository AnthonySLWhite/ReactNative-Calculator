import { StyleSheet, Animated, LayoutAnimation } from 'react-native';

export default function styles(newthis) {
  return function name() {
    let calculating
    newthis.state.calculating !== 0 ? calculating = 1 : 0


    return StyleSheet.create({
      container: {
        flex: 1,
      },
      resultText: {
        fontSize: calculating ? 25 : 40,
        color: 'black'
      },
      btnText: {
        fontSize: 30
      },
      white: {
        color: 'white'
      },
      btn: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center'
      },
      calculationText: {
        fontSize: calculating ? 40 : 25,
        color: 'white'
      },

      row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignItems: 'stretch'
      },
      result: {
        flex: calculating ? 1 : 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end'
      },
      calculation: {
        flex: calculating ? 2 : 1,
        backgroundColor: '#BBBBBB',
        justifyContent: 'center',
        alignItems: 'flex-end'
      },
      buttons: {
        flex: 7,
        flexDirection: 'row'
      },
      numbers: {
        flex: 3,
        backgroundColor: '#434343'
      },
      operations: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: '#636363'
      },
    });
  }
}

