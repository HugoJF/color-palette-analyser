import React, {useState} from 'react';
import {Draggable} from './Draggable';
import {useDispatch, useSelector} from "react-redux";
import color from 'color-convert';

export function ChartColorPoint({id, format, height, positionY, positionX, update}) {
    const dispatch = useDispatch();
    const colors = useSelector(state => state.colors);
    const [position, setPosition] = useState({x: positionX, y: positionY});
    const rgb = colors[id];

    function handleMove(p) {
        const factor = 1 - p.y / height;
        const transformedColor = update(color.rgb[format](rgb), factor);
        const newColor = color[format].rgb(transformedColor);

        dispatch.colors.updateColor({
            id,
            rgb: newColor
        });

        setPosition(p);
    }

    return (
        <Draggable
            onMove={handleMove}
            startingX={positionX}
            startingY={positionY}
            minX={positionX}
            maxX={positionX}
            minY={0}
            maxY={height}
        >
            {({props}) => (
                <circle
                    cx={position.x}
                    cy={position.y}
                    r="10"
                    className="cursor-move"
                    fill="white"
                    stroke={`rgb(${rgb.join(',')})`}
                    strokeWidth="5"
                    {...props}
                />
            )}
        </Draggable>

    );
}
