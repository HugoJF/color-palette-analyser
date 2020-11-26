import React, {useCallback, useMemo} from 'react';
import {ChartColorPoint} from "./ChartColorPoint";
import {useSelector} from "react-redux";

export function Chart({id, title, colors, colorMaxComponentValue, colorUpdate, colorComponentValue}) {
    const chartWidth = 1024;
    const chartHeight = 256;
    const colorCount = colors.length;
    const gradientStepPercent = 100 / (colorCount - 1);

    const indexToX = useCallback((index) => {
        return (chartWidth / (colorCount - 1)) * index;
    }, [chartWidth, colorCount]);

    const componentToY = useCallback((componentValue) => {
        return chartHeight - (componentValue / colorMaxComponentValue) * chartHeight;
    }, [chartHeight, colorMaxComponentValue]);

    const path = useMemo(() => {
        return colors
            .map(c => c.color)
            .map(colorComponentValue)
            .map((c, i) => `${i === 0 ? 'M' : 'L'}${indexToX(i)},${componentToY(c)}`)
            .join(' ')
    }, [colorComponentValue, indexToX, componentToY, colors]);

    return (
        <>
            {/* Chart title */}
            <h2 className="text-lg font-medium">{title}</h2>

            {/* Palette colors preview */}
            <div className="w-full flex border">
                {colors.map((c) => (
                    <div className="flex flex-col flex-grow text-gray-700 text-center font-medium bg-gray-200">
                        <div
                            style={{backgroundColor: `rgb(${c.color.join(',')})`}}
                            className="h-1"
                        />
                        <div className="py-2">{colorComponentValue(c.color)}</div>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <svg
                className="w-full bg-gray-100 border-l border-b border-r"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            >
                <defs>
                    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
                        {colors.map((c, i) => (
                            <stop
                                offset={`${gradientStepPercent * i}%`}
                                stopColor={`rgb(${c.color.join(',')})`}
                                stopOpacity="1"
                            />
                        ))}
                    </linearGradient>
                </defs>

                {/* Path  */}
                <path
                    d={path}
                    fill="none"
                    stroke={`url(#${id})`}
                    strokeWidth="5"
                    strokeLinecap="round"
                />

                {/* Points */}
                {
                    colors.map(({id, name, color}, i) => (
                        <ChartColorPoint
                            id={id}
                            color={color}
                            name={name}
                            x={indexToX(i)}
                            chartHeight={chartHeight}
                            colorUpdate={colorUpdate}
                            startingY={colorComponentValue(color) / colorMaxComponentValue}
                            colorModel="hsl"
                        />
                    ))
                }
            </svg>
        </>
    );
}
