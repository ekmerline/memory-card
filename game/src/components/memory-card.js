import React from 'react'
import styled from 'styled-components'

const FrontDiv = styled.div`

    display: ${props => props.flipped ? 'block' : 'none'};
`
const BackDiv = styled.div`
    display: ${props => props.flipped ? 'none' : 'block'};
`

const BackImg = styled.img`
    opacity: ${props => props.guessed ? '0' : '1'};
    max-width: 100%;
    max-height: 100%;
`
const FrontImg = styled.img`
    max-width: 100%;
    max-height: 100%;
`

const CardDiv = styled.div`
    float: left;
    margin: 5px;
`

const MemoryCard = props => {
    const { clickCard, frontImage, backImage, isFlipped, isGuessed, cardInd } = props

    return (
        <CardDiv role="button" onClick={() => clickCard(cardInd)}>
            <FrontDiv flipped={isFlipped}><FrontImg src={frontImage} alt="memory card front"></FrontImg></FrontDiv>
            <BackDiv flipped={isFlipped}><BackImg guessed={isGuessed} src={backImage} alt="memory card back"></BackImg></BackDiv>
        </CardDiv>
    )
}

export default MemoryCard