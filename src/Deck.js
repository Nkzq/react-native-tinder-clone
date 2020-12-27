import React, { useState, useEffect } from 'react'
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  UIManager,
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const THRESHOLD = 0.35 * SCREEN_WIDTH
const SWIPE_DURATION = 250

const Deck = ({ data, renderCard, onSwipeLeft, onSwipeRight, renderNoMoreCards }) => {
  const position = new Animated.ValueXY()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [data])

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy })
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > THRESHOLD) {
        forceSwipe('right')
      } else if (gesture.dx < -THRESHOLD) {
        forceSwipe('left')
      } else {
        resetPosition()
      }
    }
  })

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start()
  }

  const forceSwipe = direction => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
    Animated.timing(position, {
      toValue: { x: x * 1.5, y: 0 },
      duration: SWIPE_DURATION,
      useNativeDriver: false
    }).start(({ finished }) => {
      if (finished) {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        onSwipeComplete(direction)
      }
    })
  }

  const onSwipeComplete = direction => {
    const item = data[index]
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
    position.setValue({ x: 0, y: 0 })
    setIndex(index + 1)
  }

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-45deg', '0deg', '45deg']
    })

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }
  const renderCards = () => {
    if (index >= data.length) {
      return renderNoMoreCards()
    }
    return data.map((item, i) => {
      if (i < index) {
        return null
      } else if (i === index) {
        return (
          <Animated.View
            key={item.id}
            style={[getCardStyle(), styles.card, styles.cardFront]}
            {...panResponder.panHandlers}
          >
            { renderCard(item) }
          </Animated.View>
        )
      }
      return (
        <Animated.View key={item.id} style={[styles.card, {
          top: 8 * (i - index),
        }]}>
          { renderCard(item) }
        </Animated.View>
      )
    }).reverse()
  }

  return (
    <View>
      { renderCards() }
    </View>
  )
}

Deck.defaultProps = {
  onSwipeRight: () => {},
  onSwipeLeft: () => {},
}


const styles =  StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
  cardFront: {
    zIndex: 10,
    elevation: 10,
  }
})

export default Deck