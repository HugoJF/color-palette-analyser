import color from "color-convert";

export const colors = {
    state: {
        blue: {
            100: color.hex.rgb('EBF8FF'),
            200: color.hex.rgb('BEE3F8'),
            300: color.hex.rgb('90CDF4'),
            400: color.hex.rgb('63B3ED'),
            500: color.hex.rgb('4299E1'),
            600: color.hex.rgb('3182CE'),
            700: color.hex.rgb('2B6CB0'),
            800: color.hex.rgb('2C5282'),
            900: color.hex.rgb('FF4365')
        },
        red: {
            100: color.hex.rgb('FEE2E2'),
            200: color.hex.rgb('FECACA'),
            300: color.hex.rgb('FCA5A5'),
            400: color.hex.rgb('F87171'),
            500: color.hex.rgb('EF4444'),
            600: color.hex.rgb('DC2626'),
            700: color.hex.rgb('B91C1C'),
            800: color.hex.rgb('991B1B'),
            900: color.hex.rgb('7F1D1D')
        },
        green: {
            100: color.hex.rgb('D1FAE5'),
            200: color.hex.rgb('A7F3D0'),
            300: color.hex.rgb('6EE7B7'),
            400: color.hex.rgb('34D399'),
            500: color.hex.rgb('10B981'),
            600: color.hex.rgb('059669'),
            700: color.hex.rgb('047857'),
            800: color.hex.rgb('065F46'),
            900: color.hex.rgb('064E3B')
        },
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        updateColor(state, {id, name, rgb}) {
            return {
                ...state,
                [name]: {
                    ...state[name],
                    [id]: rgb,
                }
            }
        },
    },
    effects: dispatch => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        async incrementAsync(payload, rootState) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            // dispatch.count.increment(payload)
        },
    }),
}
