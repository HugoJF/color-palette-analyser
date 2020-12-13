import React, {useState} from 'react';
import cc from 'color-convert';
import {Chart} from './Chart';
import {useSelector} from "react-redux";

export default function App() {
    const [selectedColor, setSelectedColor] = useState('blue');
    const [selectedTone, setSelectedTone] = useState(500);

    const colors = useSelector(state => state.colors);

    const tones = Object.keys(Object.values(colors)[0] || {});
    const names = Object.keys(colors);

    const selected1 = Object
        .entries(colors[selectedColor])
        .map(([id, color]) => ({
            id,
            name: selectedColor,
            color,
        }));

    const selected2 = names.map(name => {
        return {
            id: selectedTone,
            name,
            color: colors[name][selectedTone]
        };
    });

    return (
        <div className="py-16">
            <div className="px-4 grid grid-cols-3 gap-8">
                <div className="">
                    <div className="grid mx-auto mb-8 container">
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
                                        onClick={() => {
                                            setSelectedColor(main)
                                            setSelectedTone(id);
                                        }}
                                        style={{backgroundColor: `#${cc.rgb.hex.raw(c)}`}}
                                        className={`flex-grow h-12`}
                                    />
                                ))}
                            </>))}
                        </div>

                    </div>
                </div>
                <div className="flex flex-col">
                    <Chart
                        id="color-h"
                        title="Hue"
                        colors={selected1}
                        colorUpdate={(c, f) => [360 * f, c[1], c[2]]}
                        colorComponentValue={(c) => (cc.rgb.hsl.raw(c)[0])}
                        colorMaxComponentValue={360}
                    />

                    <Chart
                        id="color-s"
                        title="Saturation"
                        colors={selected1}
                        colorUpdate={(color, factor) => [color[0], 100 * factor, color[2]]}
                        colorComponentValue={(color) => (cc.rgb.hsl.raw(color)[1])}
                        colorMaxComponentValue={100}
                    />

                    <Chart
                        id="color-l"
                        title="Lightness"
                        colors={selected1}
                        colorUpdate={(color, factor) => [color[0], color[1], 100 * factor]}
                        colorComponentValue={(color) => (cc.rgb.hsl.raw(color)[2])}
                        colorMaxComponentValue={100}
                    />
                </div>
                <div className="flex flex-col">
                    <Chart
                        id="tone-h"
                        title="Hue"
                        colors={selected2}
                        colorUpdate={(c, f) => [360 * f, c[1], c[2]]}
                        colorComponentValue={(c) => (cc.rgb.hsl.raw(c)[0])}
                        colorMaxComponentValue={360}
                    />

                    <Chart
                        id="tone-s"
                        title="Saturation"
                        colors={selected2}
                        colorUpdate={(color, factor) => [color[0], 100 * factor, color[2]]}
                        colorComponentValue={(color) => (cc.rgb.hsl.raw(color)[1])}
                        colorMaxComponentValue={100}
                    />

                    <Chart
                        id="tone-l"
                        title="Lightness"
                        colors={selected2}
                        colorUpdate={(color, factor) => [color[0], color[1], 100 * factor]}
                        colorComponentValue={(color) => (cc.rgb.hsl.raw(color)[2])}
                        colorMaxComponentValue={100}
                    />
                </div>
            </div>
        </div>
    );
}
