import React from "react";
import { Card } from "../card/card.component";
import './card-list.styles.css';

export const CardList = (props) => (
    // <div>sdsd {console.log(props.name)}</div>
    <div className='card-list'>
        {props.kanjiList.map(kanji => (
            <Card key={kanji.id} kanjiName={kanji} />
        ))}
    </div>
);