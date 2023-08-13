import React from 'react';
import { View } from 'react-native';
import SpinWheel from './components/SpinWheel';
import { spinStarted, spinCompleted } from './utils/Constants';
import { spinWheel, stopWheel, calculateWinner } from './utils/Functions';
import styles from './styles/Styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      winner: null,
    };
  }

  componentDidMount() {
    spinStarted.subscribe(() => {
      this.setState({ spinning: true });
    });

    spinCompleted.subscribe((winner) => {
      this.setState({ spinning: false, winner });
    });
  }

  render() {
    const { spinning, winner } = this.state;

    return (
      <View style={styles.container}>
        <SpinWheel
          spinning={spinning}
          onSpin={spinWheel}
          onStop={() => {
            stopWheel();
            calculateWinner();
          }}
        />
        {winner && <View style={styles.winnerContainer}><Text style={styles.winnerText}>{`The winner is ${winner}`}</Text></View>}
      </View>
    );
  }
}