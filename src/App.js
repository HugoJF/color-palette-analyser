import React, {useState} from 'react';
import cc from 'color-convert';
import {Chart} from './Chart';
import {useSelector} from "react-redux";

export default function App() {
    const [selected, setSelected] = useState(100);
    const colors = useSelector(state => state.colors);

    return (
        <div className="py-16 mx-auto container">
            <div className="mx-auto mb-8 w-1/2 container flex justify-center">
                {Object.entries(colors).map(([id, c]) => (
                    <div
                        onClick={() => setSelected(id)}
                        style={{backgroundColor: `#${cc.rgb.hex(c)}`}}
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
                        colorUpdate={(c, f) => [360 * f, c[1], c[2]]}
                        colorComponentValue={(c) => (cc.rgb.hsl(c)[0])}
                        colorMaxComponentValue={360}
                    />

                    <Chart
                        title="Saturation"
                        colors={colors}
                        colorUpdate={(color, factor) => [color[0], 100 * factor, color[2]]}
                        colorComponentValue={(color) => (cc.rgb.hsl(color)[1])}
                        colorMaxComponentValue={100}
                    />

                    <Chart
                        title="Lightness"
                        colors={colors}
                        colorUpdate={(color, factor) => [color[0], color[1], 100 * factor]}
                        colorComponentValue={(color) => (cc.rgb.hsl(color)[2])}
                        colorMaxComponentValue={100}
                    />
                </div>
            </div>
        </div>
    );
}
