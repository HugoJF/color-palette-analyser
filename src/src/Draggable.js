import React, { useCallback, useEffect, useRef, useState } from 'react';

function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}

export function Draggable({
  onMove,
  children,
  minX = 0,
  maxX = 100,
  minY = 0,
  maxY = 100
}) {
  const el = useRef();
  const [position, setPosition] = useState({
    x: 100,
    y: 100,
    active: false,
    offset: {}
  });

  const handleMouseDown = (e) => {
    const el = e.target;
    const bbox = e.target.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
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
      if (position.active) {
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
