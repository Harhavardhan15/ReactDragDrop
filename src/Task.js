import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  font-size: 16px;
  background: white;
  border-radius: 10px;
  border: 3px solid ${(props) => (props.isDragging ? "lightblue" : "white")};
  color: ${(props) => props.isDragging && "white"};
`;
const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className="listContainer">
            <div className="imgContainer">
              <img className="img" src={task.url} />
            </div>
            <div className="contentContainer">
              <div> {task.content}</div>
              <div className="contsecond">
                <div style={{ float: "right" }}>Id:{task.id}</div>
                <span className="label">{task.label}</span>
              </div>
            </div>
          </div>
        </Container>
      )}
    </Draggable>
  );
};
export default Task;
