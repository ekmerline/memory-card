import React from 'react'
import styled from 'styled-components'
//import React, { useState } from 'react'

//visibility: ${props => props.flipped ? 'visible' : 'hidden'};

const FrontDiv = styled.div`

    display: ${props => props.flipped ? 'block' : 'none'};
`
const BackDiv = styled.div`
    display: ${props => props.flipped ? 'none' : 'block'};
`

// const GuessedDiv = styled.div`
//     background-color: black;
//     width: 300px;
//     display: ${props => props.guessed ? 'block' : 'none'};
// `

const GuessedImg = styled.img`
    opacity: ${props => props.guessed ? '0' : '1'};
`

const CardDiv = styled.div`
    float: left;
    max-width: 300px;
`

const MemoryCard = props => {
    const { clickCard, frontImage, backImage, isFlipped, isGuessed, cardInd } = props

    //const [isFlipped, setIsFlipped ] = useState(false)
    //const [image, setImage ] = useState(backImage)

    // const handleClick = () => {
    //     if(isFlipped){
    //         setImage(backImage)
    //     }else{
    //         setImage(frontImage)
    //     }
    //     setIsFlipped(!isFlipped)
    //     clickCard(!isFlipped, id)
    // }

    return (
        <CardDiv role="button" onClick={() => clickCard(cardInd)}>
            {/* <GuessedDiv guessed={isGuessed}></GuessedDiv> */}
            <FrontDiv flipped={isFlipped}><img src={frontImage} alt="memory card front"></img></FrontDiv>
            <BackDiv flipped={isFlipped}><GuessedImg guessed={isGuessed} src={backImage} alt="memory card back"></GuessedImg></BackDiv>
            
        </CardDiv>
    )
}

export default MemoryCard