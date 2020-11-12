import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import MemoryCard from '../components/memory-card'
import styled from 'styled-components'

const GameDiv = styled.div`
    position: fixed;
    height: 100%
`

const MemoryGame = ({ data }) => {

    const { gameTitle, memoryCardBackPic, memoryCardPics } = data.contentfulMemoryGame

    const shuffleCards = array => {
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
          }

          return array
    }

    const createCards = () => {
        const cardArray = []

        for(let pic of memoryCardPics){
            cardArray.push(
                {
                    image: pic.fluid.src,
                    id: pic.id,
                    guessed: false,
                    flipped: false
                }
            )
            cardArray.push(
                {
                    image: pic.fluid.src,
                    id: pic.id,
                    guessed: false,
                    flipped: false
                }
            )
        }
        return shuffleCards(cardArray)
    }

    const [ cardsArray, setCardsArray ] = useState(createCards())
    const [ cardsFlipped, setCardsFlipped] = useState(0)
    const [ cardOneIndex, setCardOneIndex] = useState(100)
    const [ cardsLeft, setCardsLeft ] = useState(memoryCardPics.length)
    const [ guessCount, setGuessCount ] = useState(0)
    const [ winCount, setWinCount ] = useState(0)


    const resetGame = () => {
        setCardsArray(createCards())
        setCardsLeft(memoryCardPics.length)
        setGuessCount(0)
        setWinCount(winCount + 1)
    }
    const flipBack = (index, won) => {
        let tempCardsArray = cardsArray
        tempCardsArray[cardOneIndex].flipped = false
        tempCardsArray[index].flipped = false
        setCardsFlipped(0)
        setCardsArray(tempCardsArray)
        setGuessCount(guessCount + 1)
        if(won){
            if(cardsLeft === 1){
                alert(`You win! It took you ${guessCount+1} guesses. You have won ${winCount+1} games.`)
                resetGame()
            }
            else
                setCardsLeft(cardsLeft-1)
        }
    }

    const clickCard = index => {
        let tempCardsArray = cardsArray
        if(cardsFlipped === 1){
            setCardsFlipped(2)
            let won = false
            if(cardsArray[cardOneIndex].id === cardsArray[index].id){
                tempCardsArray[cardOneIndex].guessed = true
                tempCardsArray[index].guessed = true 
                won = true
            }
            tempCardsArray[index].flipped = true
            setCardsArray(tempCardsArray)
            setTimeout(function(){ flipBack(index, won)}, 2000)
        }else if(cardsFlipped === 0) {
            tempCardsArray[index].flipped = true
            setCardsFlipped(1)
            setCardOneIndex(index)
            setCardsArray(tempCardsArray)
        }
        
    }

    return (
        <Layout>
            <h1>{gameTitle}</h1>
            <GameDiv>
            {
                cardsArray.map((obj, index) => (
                    <MemoryCard clickCard={clickCard} frontImage={obj.image} backImage={memoryCardBackPic.fluid.src} isFlipped={obj.flipped} isGuessed={obj.guessed} key={index} cardInd={index}></MemoryCard>
                ))
            }
            </GameDiv>
            
        </Layout>
    )
}

export default MemoryGame

export const pageQuery = graphql`
query memoryGameQuery($slug: String!) {
    contentfulMemoryGame(slug: {eq: $slug}) {
      gameTitle
      slug
      memoryCardBackPic {
        fluid(maxWidth: 200) {
          src
        }
      }
      memoryCardPics {
        id
        fluid(maxWidth: 200) {
          src
        }
      }
    }
  }
  
`