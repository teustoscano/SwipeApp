import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';


const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

const MOTIVATION = [
  {id: 1, phrase: 'The tragedy in life doesn’t lie in not reaching your goal. The tragedy lies in having no goal to reach.'},
  {id: 2, phrase: 'If you are going to achieve excellence in big things, you develop the habit in little matters. Excellence is not an exception, it is a prevailing attitude.'},
  {id: 3, phrase: 'Don’t wait for opportunity. Create it.'},
  {id: 4, phrase: 'The key to success is to focus on goals, not obstacles.'},
  {id: 5, phrase: 'Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.'},
  {id: 6, phrase: 'Nobody can go back and start a new beginning, but anyone can start today and make a new ending.'},
  {id: 7, phrase: 'You miss 100% of the shots you don’t take.'},
  {id: 8, phrase: 'Don’t stop when you’re tired. Stop when you’re done.'},
];


export default class App extends React.Component {
  renderCard(item){
    return(
      <Card 
        key={item.id}
        title={item.text}
        image={{uri: item.uri}}
        titleStyle={{fontSize:22, color:'#232931'}}
        containerStyle={{backgroundColor:'#ededed'}}
      >
      <Text style={{marginBottom: 10, backgroundColor:'#ededed'}}>Here goes a good motivational phrase!</Text>
      </Card>
    );
  }

  renderNoMoreCards(){
    return(
      <Card title="All Done!">
        <Text style={{marginBottom: 10}}>There's no more content here!</Text>
        <Button 
          backgroundColor='#f73859'
          title="Start a new habit!"
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck 
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
        <View style={styles.containerBot}>
        <Button 
          raised
          icon={{name: 'check'}}
          backgroundColor='#f73859'
          containerViewStyle={{marginTop: 480, borderRadius: 4, width: '50%'}}
          buttonStyle={{borderRadius: 4}}
          fontWeight={'bold'}
          title="I made it!"
        />
      </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#232931',
  },
  containerBot: {
    backgroundColor: '#232931',
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


