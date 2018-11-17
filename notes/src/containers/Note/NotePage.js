import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

const Main = styled.div`
  border: 1px solid red;
`;
const Modal = styled.div`
  display: flex;
  justify-conent: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(114, 144, 144, 0.66);
`;
const Container = styled.div`
  flex-directon: column;
  margin: 0 500px 250px;
  padding: 50px 100px;
  border: 3px solid rgb(187, 187, 187);
  background: white;
  z-index: 2;
  p {
    text-align: center;
  }
`;
const Content = styled.div`
  display: flex;
`;
const Button = styled.div`
  width: ${props => props.edit.width};
  padding: 15px 60px;
  font-size: 20px;
  color: white;
  text-align: center;
  text-decoration: none;
  margin: 10px;
  cursor: pointer;
  outline: none;
  background: ${props => props.theme.bg};
`;
const theme = {
  bg: "red"
};
Button.defaultProps = {
  theme: {
    bg: "#00cec9",
    width: "200px"
  }
};
const edit = {
  bg: 'bg: "#00cec9"',
  width: "100px"

};
const NvLinks = styled.div`
  display: flex;
  border: 1px solid red;
  justify-content: flex-end;
  align-items: flex-end;
`;

const NotePage = props => {
  if (props.notes.length) {
    let note = props.notes.find(
      note => `${note._id}` === props.match.params.id
    );

    const deleted = e => {
      e.preventDefault();
      props.deleteNote(note._id);
      props.history.push("/");
    };
    return (
      <Main key={note._id}>
        <NvLinks>
          <Link to={`/note/${note._id}/edit`}>
            <ThemeProvider theme={edit}>
            <Button onClick={() => props.editNote(note.title, note.textBody)}>
              edit
            </Button>
            </ThemeProvider>
          </Link>{" "}
          {""}
          <button onClick={props.deleteNoteOn}>delete</button>
        </NvLinks>
        {props.delete && (
          <Modal>
            <Container>
              <p>Are you sure you want to delete this?</p>
              <Content>
                <ThemeProvider theme={theme}>
                  <Button onClick={deleted}>Delete</Button>
                </ThemeProvider>
                <Button onClick={props.deleteNoteOff}>No</Button>
              </Content>
            </Container>
          </Modal>
        )}

        <h1>{note.title}</h1>
        <p>{note.textBody}</p>
      </Main>
    );
  }
};

export default NotePage;
