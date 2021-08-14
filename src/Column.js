import styled from "styled-components";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
const Container = styled.div`
  margin: 10px;
  background: ${(props) => (props.isDragging ? "#e5fcef" : "#eaecf0")};
  border-radius: 10px;
`;
const Title = styled.h3`
  padding: 10px;
  text-align: left;
  font-weight: bold;
`;
const TasksList = styled.div`
  padding: 10px;
  min-height: 100%;
  transition: background 0.3s ease-in;
  background: ${(props) => (props.isDraggingOver ? "#feece8" : "#eaecf0")};
`;

const Column = ({ column, task, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Container
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TasksList
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {task.map((tsk, index) => (
                  <Task key={tsk.id} task={tsk} index={index} />
                ))}
                {provided.placeholder}
              </TasksList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
