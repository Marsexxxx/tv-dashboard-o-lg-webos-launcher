import { useState, useEffect, useCallback } from 'react';

export function useSpatialNav(rows, onSelectItem, onEdgeHorizontal) {
  const [focusCoords, setFocusCoords] = useState({ row: 0, col: 0 });

  const handleKeyDown = useCallback(
    (event) => {
      const { key, keyCode } = event;

      const isUp = key === 'ArrowUp' || keyCode === 38;
      const isDown = key === 'ArrowDown' || keyCode === 40;
      const isLeft = key === 'ArrowLeft' || keyCode === 37;
      const isRight = key === 'ArrowRight' || keyCode === 39;
      const isEnter = key === 'Enter' || keyCode === 13;
      const isBack = key === 'Escape' || key === 'Backspace' || keyCode === 461;

      if (isUp || isDown || isLeft || isRight || isEnter || isBack) {
        event.preventDefault();
      }

      if (isUp) {
        setFocusCoords((prev) => {
          const nextRow = Math.max(0, prev.row - 1);
          const maxColInNextRow = Math.max(0, (rows[nextRow]?.items?.length || 1) - 1);
          return {
            row: nextRow,
            col: Math.min(prev.col, maxColInNextRow),
          };
        });
      } else if (isDown) {
        setFocusCoords((prev) => {
          const nextRow = Math.min(rows.length - 1, prev.row + 1);
          const maxColInNextRow = Math.max(0, (rows[nextRow]?.items?.length || 1) - 1);
          return {
            row: nextRow,
            col: Math.min(prev.col, maxColInNextRow),
          };
        });
      } else if (isLeft) {
        setFocusCoords((prev) => {
          if (prev.col === 0 && onEdgeHorizontal) {
            const handled = onEdgeHorizontal('left', prev.row);
            if (handled) return { ...prev, col: 2 };
          }
          return {
            ...prev,
            col: Math.max(0, prev.col - 1),
          };
        });
      } else if (isRight) {
        setFocusCoords((prev) => {
          const maxCol = Math.max(0, (rows[prev.row]?.items?.length || 1) - 1);
          if (prev.col === maxCol && onEdgeHorizontal) {
            const handled = onEdgeHorizontal('right', prev.row);
            if (handled) return { ...prev, col: 0 };
          }
          return {
            ...prev,
            col: Math.min(maxCol, prev.col + 1),
          };
        });
      } else if (isEnter) {
        const selectedItem = rows[focusCoords.row]?.items[focusCoords.col];
        if (selectedItem && onSelectItem) {
          onSelectItem(selectedItem);
        }
      } else if (isBack) {
        setFocusCoords({ row: 0, col: 0 });
      }
    },
    [rows, focusCoords, onSelectItem, onEdgeHorizontal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { focusCoords, setFocusCoords };
}
