import React from 'react';
import db from './src/config';
import { StyleSheet, Text, View, Dimensions, StatusBar, AsyncStorage } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Deck from './src/Deck';
import * as firebase from 'firebase';
import 'firebase/firestore';

const SCREEN_HEIGHT = Dimensions.get('window').height;

// const DATA = [
//   { id: 1, text: 'Card #1', phrase: 'The tragedy in life doesn’t lie in not reaching your goal. The tragedy lies in having no goal to reach.' },
//   { id: 2, text: 'Card #2', phrase: 'If you are going to achieve excellence in big things, you develop the habit in little matters. Excellence is not an exception, it is a prevailing attitude.' },
//   { id: 3, text: 'Card #3', phrase: 'Don’t wait for opportunity. Create it.' },
//   { id: 4, text: 'Card #4', phrase: 'The key to success is to focus on goals, not obstacles.' },
//   { id: 5, text: 'Card #5', phrase: "Believe you can and you're halfway there" },
//   { id: 6, text: 'Card #6', phrase: 'Build your own dreams or someone will hire you to buid theirs.' },
//   { id: 7, text: 'Card #7', phrase: 'You miss 100% of the shots you don’t take.' },
//   { id: 8, text: 'Card #8', phrase: 'Don’t stop when you’re tired. Stop when you’re done.' },
// ];


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      habits: [], 
      markedData: ['2018-12-12']
    };
  }

  componentWillMount(){
    firebase.firestore().collection('habits').get().then((snapshot) => {
      let habitos = []
      snapshot.docs.forEach( doc => {
        console.log(doc.data())
        habitos = [...habitos, doc.data()]
      })
      this.setState({ habits: habitos })
    })
  }

  componentDidMount(){
    StatusBar.setHidden(true);
  }

  renderCard(item){
    let marked = {};
    item.dates.forEach((val) => {
      marked[val] = {selected: true, marked: true, customStyles:{ container: { backgroundColor: '#f73859' }, text:{ color: '#ededed', fontWeight: 'bold'}}  };
    });
    return(
      <Card 
        key={item.id}
        title={item.title}
        titleStyle={{fontSize:22, color:'#232931'}}
        containerStyle={{backgroundColor:'#ededed', height: SCREEN_HEIGHT-190}}
      >
      <Text style={{marginBottom: 10, textAlign:'center', fontStyle: 'italic'}}>{item.phrase}</Text>
        <Calendar
          style={{borderWidth: 0,marginBottom: 30, borderColor: '#232931'}}
          theme={{calendarBackground: '#ededed', arrowColor: '#232931'}}
          markedDates={marked}
          markingType={'custom'}
        />
      </Card>
    );
  }

  renderNoMoreCards(){
    return(
      <Card 
        title="That's all folks!!!"
        titleStyle={{fontSize:18, color:'#232931'}}
        containerStyle={styles.containerNoMoCards}    
      >
        <Text style={{marginBottom: 2, textAlign: 'center', fontSize:22}}>Do something new today!</Text>
        <View style={styles.containerNoMoCards}>
          <FormLabel labelStyle={{fontWeight: 'bold'}}>Your new Swipe Habit name</FormLabel>
          <FormInput onChangeText={(text) => this.setState({habitName: text})} containerStyle={{width: '50%', marginBottom: 32}}/>
        </View>
        <View style={styles.containerNoMoCards}>
          <Button 
            backgroundColor='#f73859'
            title="Start a new habit!"
            containerViewStyle={{borderRadius: 4, width: '50%'}}
            buttonStyle={{borderRadius: 4}}
            fontWeight={'bold'}
            onPress={this.renderNewCard.bind(this)}
          />
        </View>
      </Card>
    );
  }

  renderNewCard(){
    this.forceUpdate();
  }

  markDownDay(){
    /*var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var day = year + "-" + month + "-" + date;*/
    var day = (new Date()).toISOString().split("T")[0];
    let joined = this.state.markedData.concat(day);
    this.setState({markedData: joined});
    console.log('Marked Data', this.state.markedData);
    return day;
  }

  saveData(){
    let data = this.state.markedData;
    AsyncStorage.setItem('markedData', data);
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
        <View style={styles.containerBot}>
        <Button 
          raised
          icon={{name: 'check'}}
          backgroundColor='#f73859'
          containerViewStyle={{marginTop: SCREEN_HEIGHT-80, borderRadius: 4, width: '50%'}}
          buttonStyle={{borderRadius: 4}}
          fontWeight={'bold'}
          title="I made it!"
          onPress={this.markDownDay.bind(this)}
        />
        </View>
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
  },
  containerNoMoCards: {
    backgroundColor: '#ededed',
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


