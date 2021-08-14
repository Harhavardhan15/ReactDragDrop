import "./styles.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import data from "./data";
import { useState } from "react";
import Column from "./Column";

export default function App() {
  // console.log(data);
  const [copyData, setCopyData] = useState(data);
  const { tasks, columns, columnOrder } = copyData;
  const dragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === "column") {
      const newColOrder = Array.from(columnOrder);
      newColOrder.splice(source.index, 1);
      newColOrder.splice(destination.index, 0, draggableId);
      const newData = {
        ...copyData,
        columnOrder: newColOrder
      };
      setCopyData(newData);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };
      const newData = {
        ...copyData,
        columns: {
          ...columns,
          [newColumn.id]: newColumn
        }
      };
      setCopyData(newData);
    }
    //Moving between lists
    else {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds
      };
      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds
      };
      const newData = {
        ...copyData,
        columns: {
          ...columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      };
      setCopyData(newData);
    }
  };

  return (
    <DragDropContext onDragEnd={(result) => dragEnd(result)}>
      <Droppable droppableId="allcolumn" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="App"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {columnOrder.map((columnId, index) => {
              const column = columns[columnId];
              const task = column.taskIds.map((taskId) => tasks[taskId]);
              return (
                <Column
                  key={column.id}
                  column={column}
                  task={task}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
