import { useState, useEffect, useCallback } from 'react';

export function useSpatialNav(rows, onSelectItem) {
  const [focusCoords, setFocusCoords] = useState({ row: 0, col: 0 });

  const handleKeyDown = useCallback(
    (event) => {
      const { key, keyCode } = event;

      // Códigos nativos de LG webOS y teclado estándar
      const isUp = key === 'ArrowUp' || keyCode === 38;
      const isDown = key === 'ArrowDown' || keyCode === 40;
      const isLeft = key === 'ArrowLeft' || keyCode === 37;
      const isRight = key === 'ArrowRight' || keyCode === 39;
      const isEnter = key === 'Enter' || keyCode === 13;
      const isBack = key === 'Escape' || key === 'Backspace' || keyCode === 461; // 461 = Back en LG webOS

      if (isUp || isDown || isLeft || isRight || isEnter || isBack) {
        event.preventDefault();
      }

      if (isUp) {
        setFocusCoords((prev) => {
          const nextRow = Math.max(0, prev.row - 1);
          const maxColInNextRow = rows[nextRow].items.length - 1;
          return {
            row: nextRow,
            // Mantiene la columna equivalente sin salirse del límite de la fila superior
            col: Math.min(prev.col, maxColInNextRow),
          };
        });
      } else if (isDown) {
        setFocusCoords((prev) => {
          const nextRow = Math.min(rows.length - 1, prev.row + 1);
          const maxColInNextRow = rows[nextRow].items.length - 1;
          return {
            row: nextRow,
            col: Math.min(prev.col, maxColInNextRow),
          };
        });
      } else if (isLeft) {
        setFocusCoords((prev) => ({
          ...prev,
          col: Math.max(0, prev.col - 1),
        }));
      } else if (isRight) {
        setFocusCoords((prev) => {
          const maxCol = rows[prev.row].items.length - 1;
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
        // Al pulsar Back en el control remoto, regresa rápidamente al inicio [0,0]
        setFocusCoords({ row: 0, col: 0 });
      }
    },
    [rows, focusCoords, onSelectItem]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { focusCoords, setFocusCoords };
}