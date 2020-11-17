import React, { useState } from 'react';
import './styles.css';
import color from 'color-convert';
import { Chart } from './Chart';
import { SketchPicker } from 'react-color';
import useInterval from 'use-interval';

export default function App() {
  const [selected, setSelected] = useState(100);
  const [colors, setColors] = useState({
    100: color.hex.rgb('EBF8FF'),
    200: color.hex.rgb('BEE3F8'),
    300: color.hex.rgb('90CDF4'),
    400: color.hex.rgb('63B3ED'),
    500: color.hex.rgb('4299E1'),
    600: color.hex.rgb('3182CE'),
    700: color.hex.rgb('2B6CB0'),
    800: color.hex.rgb('2C5282'),
    900: color.hex.rgb('FF4365')
  });

  function updateColor(id, format, func) {
    setColors({
      ...colors,
      [id]: color[format].rgb(func(color.rgb[format](colors[id])))
    });
  }

  return (
    <div className="py-16 mx-auto container">
      <div className="mx-auto mb-8 w-1/2 container flex justify-center">
        {Object.entries(colors).map(([id, c]) => (
          <div
            onClick={() => setSelected(id)}
            style={{ backgroundColor: `#${color.rgb.hex(c)}` }}
            className={`flex-grow ${
              selected === id ? 'border-2 border-black' : ''
            } h-16`}
          ></div>
        ))}
      </div>
      <div className="flex">
        <div className="w-1/2 flex flex-col">
          <Chart
            title="Hue"
            colors={colors}
            yCalc={(rgb) => color.rgb.hsl(rgb)[0]}
            yMax={360}
          />
          <Chart
            title="Saturation"
            colors={colors}
            yCalc={(rgb) => color.rgb.hsl(rgb)[1]}
            yMax={100}
          />
          <Chart
            title="Lightness"
            colors={colors}
            yCalc={(rgb) => color.rgb.hsl(rgb)[1]}
            yMax={100}
          />
        </div>
        <div className="flex justify-center w-1/2">
          <div>
            <SketchPicker
              onChange={(e) => {
                const c = { ...colors };
                c[selected] = color.hex.rgb(e.hex);
                setColors(c);
              }}
              color={color.rgb.hex(colors[selected])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
