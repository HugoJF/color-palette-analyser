import React from 'react';
import {useDispatch} from "react-redux";
import {ChartColorPoint} from "./ChartColorPoint";
import color from 'color-convert';

export function Chart({title, colors, yCalc, yMax, update, yPos}) {
    const dispatch = useDispatch();
    const width = 1024;
    const height = 256;
    const gradientStep = 100 / (Object.values(colors).length - 1);
    const colorCount = Object.values(colors).length;

    function x(index) {
        return (width / (colorCount - 1)) * index;
    }

    function y(value) {
        return height - (value / yMax) * height;
    }

    const svg = Object.values(colors)
        .map(yCalc)
        .map((c, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(c)}`)
        .join(' ');

    // console.log(svg);

    return (
        <>
            <h2 className="text-lg font-medium">{title}</h2>
            <div className="w-full flex border">
                {Object.values(colors).map((c) => (
                    <div className="flex flex-col flex-grow text-gray-700 text-center font-medium bg-gray-200">
                        <div
                            style={{backgroundColor: `rgb(${c.join(',')})`}}
                            className="h-1"
                        ></div>
                        <div className="py-2">{yCalc(c)}</div>
                    </div>
                ))}
            </div>
            <svg
                className="w-full bg-gray-100 border-l border-b border-r"
                viewBox={`0 0 ${width} ${height}`}
            >
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        {Object.values(colors).map((c, i) => (
                            <stop
                                offset={`${gradientStep * i}%`}
                                stopColor={`rgb(${c.join(',')})`}
                                stopOpacity="1"
                            />
                        ))}
                    </linearGradient>
                </defs>

                {/* Path  */}
                <path
                    d={svg}
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="5"
                    strokeLinecap="round"
                />

                {/* Points */}
                {Object.entries(colors).map(([id, c], i) => (
                    <ChartColorPoint
                        height={height}
                        id={id}
                        update={update}
                        positionX={x(i)}
                        positionY={yPos(height, c)}
                        format="hsl"
                    />
                ))}
            </svg>
        </>
    );
}
