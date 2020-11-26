import React from 'react';
import {Draggable} from './Draggable';
import {useDispatch, useSelector} from "react-redux";
import cc from 'color-convert';

export function ChartColorPoint({id, name, color, colorModel, chartHeight, startingY, x, colorUpdate}) {
    const dispatch = useDispatch();

    function handleOnMove(position) {
        // This is necessary since p.y origin is at top-left and the plots are at bottom-left
        const factor = 1 - (position.y / chartHeight);
        const transformedColor = colorUpdate(cc.rgb[colorModel](color), factor);
        const newColor = cc[colorModel].rgb(transformedColor);

        dispatch.colors.updateColor({
            id,
            name,
            rgb: newColor
        });
    }

    return (
        <Draggable
            onMove={handleOnMove}
            startingX={x}
            startingY={(1 - startingY) * chartHeight}
            minX={x}
            maxX={x}
            minY={0}
            maxY={chartHeight}
        >
            {({props}) => (
                <circle
                    cx={props.position.x}
                    cy={props.position.y}
                    r="10"
                    className="cursor-move"
                    fill="white"
                    stroke={`rgb(${color.join(',')})`}
                    strokeWidth="5"
                    {...props}
                />
            )}
        </Draggable>

    );
}
