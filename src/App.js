import React, {useState} from 'react';
import cc from 'color-convert';
import {Chart} from './Chart';
import {useSelector} from "react-redux";

export default function App() {
    const [selectedColor, setSelectedColor] = useState('blue');
    const colors = useSelector(state => state.colors);

    const tones = Object.keys(Object.values(colors)[0] || {});

    const selected = Object
        .entries(colors[selectedColor])
        .map(([id, color]) => ({
            id,
            name: selectedColor,
            color,
        }));

    return (
        <div className="py-16 mx-auto container">
            <div className="grid mx-auto mb-8 w-1/2 container">
                <div className="grid" style={{gridTemplateColumns: `repeat(${tones.length + 1},minmax(0,1fr))`}}>
                    {/* Tone colors */}
                    <div/>
                    {tones.map(tone => <div className="text-center text-gray-600 font-medium">
                        {tone}
                    </div>)}

                    {/* Color palette */}
                    {Object.entries(colors).map(([main, p]) => (<>
                        {/* Color name */}
                        <div className="mr-3 flex justify-end items-center text-gray-600 font-medium capitalize">
                            {main}
                        </div>

                        {/* Color blocks */}
                        {Object.entries(p).map(([id, c]) => (
                            <div
                                onClick={() => setSelectedColor(main)}
                                style={{backgroundColor: `#${cc.rgb.hex(c)}`}}
                                className={`flex-grow h-12`}
                            />
                        ))}
                    </>))}
                </div>

            </div>

            <div className="flex justify-center">
                <div className="w-1/2 flex flex-col">
                    <Chart
                        title="Hue"
                        colors={selected}
                        colorUpdate={(c, f) => [360 * f, c[1], c[2]]}
                        colorComponentValue={(c) => (cc.rgb.hsl(c)[0])}
                        colorMaxComponentValue={360}
                    />

                    <Chart
                        title="Saturation"
                        colors={selected}
                        colorUpdate={(color, factor) => [color[0], 100 * factor, color[2]]}
                        colorComponentValue={(color) => (cc.rgb.hsl(color)[1])}
                        colorMaxComponentValue={100}
                    />

                    <Chart
                        title="Lightness"
                        colors={selected}
                        colorUpdate={(color, factor) => [color[0], color[1], 100 * factor]}
                        colorComponentValue={(color) => (cc.rgb.hsl(color)[2])}
                        colorMaxComponentValue={100}
                    />
                </div>
            </div>
        </div>
    );
}
