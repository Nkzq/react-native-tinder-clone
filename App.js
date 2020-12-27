import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Deck from './src/Deck'

const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { id: 2, text: 'Card #2', uri: 'https://randomuser.me/api/portraits/women/18.jpg' },
  { id: 3, text: 'Card #3', uri: 'https://randomuser.me/api/portraits/women/20.jpg' },
  { id: 4, text: 'Card #4', uri: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { id: 5, text: 'Card #5', uri: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { id: 6, text: 'Card #6', uri: 'https://randomuser.me/api/portraits/women/23.jpg' },
  { id: 7, text: 'Card #7', uri: 'https://randomuser.me/api/portraits/women/24.jpg' },
  { id: 8, text: 'Card #8', uri: 'https://randomuser.me/api/portraits/women/25.jpg' },
]

const App = () => {
  const renderCard = item => (
    <Card key={item.id}>
      <Card.Title>{item.text}</Card.Title>
      <Card.Image source={{ uri: item.uri }} style={{ height: 400 }} />
      <Button
          title='See more'
        />
    </Card>
  )

  const renderNoMoreCards = () => (
    <Card>
      <Card.Title>All done !</Card.Title>
      <Card.Divider />
      <Text>No more profils near your location</Text>
    </Card>
  )

  return (
    <View style={styles.container}>
      <Deck
        data={DATA}
        renderCard={renderCard}
        onSwipeRight={() => {}}
        onSwipeLeft={() => {}}
        renderNoMoreCards={renderNoMoreCards}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
  },
})

export default App