import React, {useState} from 'react';
import color from 'color-convert';
import {Chart} from './Chart';
import {useDispatch, useSelector} from "react-redux";

export default function App() {
    const [selected, setSelected] = useState(100);
    const dispatch = useDispatch();
    const colors = useSelector(state => state.colors)

    return (
        <div className="py-16 mx-auto container">
            <div className="mx-auto mb-8 w-1/2 container flex justify-center">
                {Object.entries(colors).map(([id, c]) => (
                    <div
                        onClick={() => setSelected(id)}
                        style={{backgroundColor: `#${color.rgb.hex(c)}`}}
                        className={`flex-grow ${
                            selected === id ? 'border-2 border-black' : ''
                        } h-16`}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                <div className="w-1/2 flex flex-col">
                    <Chart
                        title="Hue"
                        colors={colors}
                        yCalc={(rgb) => color.rgb.hsl(rgb)[0]}
                        yMax={360}
                        update={(c, f) => [360 * f, c[1], c[2]]}
                        yPos={(height, c) => (1 - color.rgb.hsl(c)[0] / 360) * height}
                    />
                    <Chart
                        title="Saturation"
                        colors={colors}
                        yCalc={(rgb) => color.rgb.hsl(rgb)[1]}
                        yMax={100}
                        update={(c, f) => [c[0], 100 * f, c[2]]}
                        yPos={(height, c) => (1 - color.rgb.hsl(c)[1] / 100) * height}
                    />
                    <Chart
                        title="Lightness"
                        colors={colors}
                        yCalc={(rgb) => color.rgb.hsl(rgb)[2]}
                        yMax={100}
                        update={(c, f) => [c[0], c[1], 100 * f]}
                        yPos={(height, c) => (1 - color.rgb.hsl(c)[2] / 100) * height}
                    />
                </div>
            </div>
        </div>
    );
}
