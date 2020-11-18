import React from 'react';
import {Draggable} from './Draggable';
import {useDispatch, useSelector} from "react-redux";
import cc from 'color-convert';

export function ChartColorPoint({id, name, colorModel, chartHeight, startingY, x, colorUpdate}) {
    const dispatch = useDispatch();
    const colors = useSelector(state => state.colors);
    const rgb = colors[name][id];

    function handleOnMove(position) {
        // This is necessary since p.y origin is at top-left and the plots are at bottom-left
        const factor = 1 - (position.y / chartHeight);
        const transformedColor = colorUpdate(cc.rgb[colorModel](rgb), factor);
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
                    stroke={`rgb(${rgb.join(',')})`}
                    strokeWidth="5"
                    {...props}
                />
            )}
        </Draggable>

    );
}
