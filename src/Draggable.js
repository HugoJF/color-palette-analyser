import React, {useCallback, useEffect, useRef, useState} from 'react';
import {clamp} from "./utils";

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

    useEffect(() => {
        setPosition({
            ...position,
            x: startingX,
            y: startingY,
        })
    }, [startingX, startingY]);

    const handleMouseDown = useCallback((e) => {
        const bbox = e.target.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;

        setPosition({
            ...position,
            active: true,
            offset: {x, y}
        });
    }, [setPosition, position]);

    // FIXME: handleMouseMove can be called multiple times between renders, figure out a way to avoid this
    const handleMouseMove = useCallback(
        (e) => {
            if (!position.active || !el.current) {
                return
            }

            const bbox = el.current.getBoundingClientRect();
            const x = e.clientX - bbox.left;
            const y = e.clientY - bbox.top;

            const n = {
                x: clamp(position.x + x - position.offset.x, minX, maxX),
                y: clamp(position.y + y - position.offset.y, minY, maxY)
            };

            setPosition({
                ...position,
                ...n
            });
            onMove(n);
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
            position,
            ref: el,
            onMouseDown: handleMouseDown,
            onMouseLeave: handleMouseUp,
            onMouseUp: handleMouseUp
        }
    });
}
