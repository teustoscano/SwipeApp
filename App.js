import React from 'react';
import db from './src/config';
import { StyleSheet, Text, View, Dimensions, StatusBar, AsyncStorage } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Deck from './src/Deck';
import * as firebase from 'firebase';
import 'firebase/firestore';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
      habitName: ''
    };
  }

  componentWillMount() {
    firebase.firestore().collection('habits').get().then((snapshot) => {
      let habitos = []
      snapshot.docs.forEach(doc => {
        console.log(doc.data())
        habitos = [...habitos, doc.data()]
      })
      this.setState({ habits: habitos })
    })
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  renderCard(item) {
    let marked = {};
    item.dates.forEach((val) => {
      marked[val] = { selected: true, marked: true, customStyles: { container: { backgroundColor: '#f73859' }, text: { color: '#ededed', fontWeight: 'bold' } } };
    });
    return (
      <View>
        <Card
          key={item.id}
          title={item.title}
          titleStyle={{ fontSize: 22, color: '#232931' }}
          containerStyle={{ backgroundColor: '#ededed', height: SCREEN_HEIGHT }}
        >
          <Calendar
            style={{ borderWidth: 0, marginBottom: 30, borderColor: '#232931' }}
            theme={{ calendarBackground: '#ededed', arrowColor: '#232931' }}
            markedDates={marked}
            markingType={'custom'}
          />
          <View style={styles.containerNoMoCards}>
            <Button
              raised
              icon={{ name: 'check' }}
              backgroundColor='#f73859'
              title="I Made It!"
              containerViewStyle={{ borderRadius: 4, width: '50%' }}
              buttonStyle={{ borderRadius: 4 }}
              fontWeight={'bold'}
              onPress={() => this.markDownDay(item.id)}
            />
          </View>
        </Card>
      </View>

    );
  }

  renderNoMoreCards() {
    return (
      <Card
        title="That's all folks!!!"
        titleStyle={{ fontSize: 18, color: '#232931' }}
        containerStyle={styles.containerNoMoCards}
      >
        <Text style={{ marginBottom: 2, textAlign: 'center', fontSize: 22 }}>Do something new today!</Text>
        <View style={styles.containerNoMoCards}>
          <FormLabel labelStyle={{ fontWeight: 'bold' }}>Your new Swipe Habit name</FormLabel>
          <FormInput onChangeText={(text) => this.setState({ habitName: text })}  containerStyle={{ width: '50%', marginBottom: 32 }} />
        </View>
        <View style={styles.containerNoMoCards}>
          <Button
            backgroundColor='#f73859'
            title="Start a new habit!"
            containerViewStyle={{ borderRadius: 4, width: '50%' }}
            buttonStyle={{ borderRadius: 4 }}
            fontWeight={'bold'}
            onPress={this.renderNewCard.bind(this)}
          />
        </View>
      </Card>
    );
  }

  renderNewCard() {
    firebase.firestore().collection('habits').add({
      title: this.state.habitName,
      dates: [],
      id: '1'
    }).then((doc) => {
      firebase.firestore().collection('habits').doc(doc.id).update({
        id: doc.id
      })
    }).then(() => {
      console.log('RENREDER')
      this.forceUpdate()
    })
    this.forceUpdate()
  }

  markDownDay(id) {
    /*var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var day = year + "-" + month + "-" + date;*/
    var day = (new Date()).toISOString().split("T")[0];
    console.log('Marked Data', day);
    firebase.firestore().collection('habits').doc(id).update({
      dates: firebase.firestore.FieldValue.arrayUnion(day)
    })
  }

  render() {
    const { habits } = this.state
    return (
      <View style={styles.container}>
        <Deck
          data={habits}
          renderCard={this.renderCard.bind(this)}
          renderNoMoreCards={this.renderNoMoreCards.bind(this)}
          renderNewCard={this.renderNewCard}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    backgroundColor: '#232931',
  },
  containerBot: {
    backgroundColor: '#232931',
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0
  },
  containerNoMoCards: {
    backgroundColor: '#ededed',
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


