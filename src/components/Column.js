import React from 'react';
import { useDrop } from "react-dnd";
import { COLUMN_NAMES } from "../constans";


function Column({ children, className, title }) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "Our first type",
        drop: () => ({ name: title }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        // Có thể di chuyển task đến cột 
        canDrop: (item) => {
            const { NEW, IN_PROGRESS, RESOLVED } = COLUMN_NAMES;
            const { currentColumnName } = item;
            return (
                currentColumnName === title ||
                (currentColumnName === NEW &&
                    (title === IN_PROGRESS)) ||
                (currentColumnName === NEW &&
                    (title === RESOLVED)) ||
                (currentColumnName === IN_PROGRESS &&
                    (title === RESOLVED))
            );
        }
    });

    const getBackgroundColor = () => {
        if (isOver) {
            if (canDrop) {
                return "rgb(188,251,255)";
            } else if (!canDrop) {
                return "rgb(255,188,188)";
            }
        } else {
            return "";
        }
    };

    return (
        <div
            ref={drop}
            className={className}
            style={{ backgroundColor: getBackgroundColor() }}
        >
            <div>
                <span>{title}</span>
            </div>
            {children}
        </div>
    );
}

export default Column;