import React, {useCallback, useEffect, useRef, useState} from 'react';

function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
}

export function Draggable({
                              onMove,
                              children,
                              startingX = 0,
                              startingY = 0,
                              minX = -Infinity,
                              maxX = Infinity,
                              minY = -Infinity,
                              maxY = Infinity
                          }) {
    const el = useRef();
    const [position, setPosition] = useState({
        x: startingX,
        y: startingY,
        active: false,
        offset: {}
    });

    const handleMouseDown = (e) => {
        const bbox = e.target.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        console.log(position);
        setPosition({
            ...position,
            active: true,
            offset: {
                x,
                y
            }
        });
    };

    const handleMouseMove = useCallback(
        (e) => {
            if (position.active && el.current) {
                const bbox = el.current.getBoundingClientRect();
                const x = e.clientX - bbox.left;
                const y = e.clientY - bbox.top;

                const n = {
                    x: clamp(position.x - (position.offset.x - x), minX, maxX),
                    y: clamp(position.y - (position.offset.y - y), minY, maxY)
                };
                setPosition({
                    ...position,
                    ...n
                });
                console.log(position);
                onMove(n);
            }
        },
        [minX, maxX, minY, maxY, onMove, setPosition, position]
    );

    const handleMouseUp = useCallback(
        (e) => {
            setPosition({
                ...position,
                active: false
            });
        },
        [setPosition, position]
    );

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return children({
        props: {
            ref: el,
            onMouseDown: handleMouseDown,
            onMouseLeave: handleMouseUp,
            onMouseUp: handleMouseUp
        }
    });
}
