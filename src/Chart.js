import React, {useCallback, useMemo} from 'react';
import {ChartColorPoint} from "./ChartColorPoint";

export function Chart({title, colors, colorMaxComponentValue, colorUpdate, colorComponentValue}) {
    const chartWidth = 1024;
    const chartHeight = 256;
    const colorCount = Object.values(colors).length;
    const gradientStepPercent = 100 / (colorCount - 1);

    const indexToX = useCallback((index) => {
        return (chartWidth / (colorCount - 1)) * index;
    }, [chartWidth, colorCount]);

    const componentToY = useCallback((componentValue) => {
        return chartHeight - (componentValue / colorMaxComponentValue) * chartHeight;
    }, [chartHeight, colorMaxComponentValue, chartHeight]);

    const path = useMemo(() => (
        Object.values(colors)
            .map(colorComponentValue)
            .map((c, i) => `${i === 0 ? 'M' : 'L'}${indexToX(i)},${componentToY(c)}`)
            .join(' ')
    ), [colorComponentValue, indexToX, componentToY, colors]);

    return (
        <>
            {/* Chart title */}
            <h2 className="text-lg font-medium">{title}</h2>

            {/* Palette colors preview */}
            <div className="w-full flex border">
                {Object.values(colors).map((c) => (
                    <div className="flex flex-col flex-grow text-gray-700 text-center font-medium bg-gray-200">
                        <div
                            style={{backgroundColor: `rgb(${c.join(',')})`}}
                            className="h-1"
                        />
                        <div className="py-2">{colorComponentValue(c)}</div>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <svg
                className="w-full bg-gray-100 border-l border-b border-r"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            >
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        {Object.values(colors).map((c, i) => (
                            <stop
                                offset={`${gradientStepPercent * i}%`}
                                stopColor={`rgb(${c.join(',')})`}
                                stopOpacity="1"
                            />
                        ))}
                    </linearGradient>
                </defs>

                {/* Path  */}
                <path
                    d={path}
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="5"
                    strokeLinecap="round"
                />

                {/* Points */}
                {Object.entries(colors).map(([id, c], i) => (
                    <ChartColorPoint
                        id={id}
                        x={indexToX(i)}
                        chartHeight={chartHeight}
                        colorUpdate={colorUpdate}
                        startingY={colorComponentValue(c) / colorMaxComponentValue}
                        colorModel="hsl"
                    />
                ))}
            </svg>
        </>
    );
}
