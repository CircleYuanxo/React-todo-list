import React from 'react';
import { ThemeProvider } from 'styled-components';
import TodoList from './components/TodoList'

const theme = {
  colors: {
    pink: "#ffc7c7",
    lightPink: "#ffe2e2",
    lightGray: "#f6f6f6",
    purple: "#8785a2",
    peachPink: "#fc5185",
  },
  fonts: {
    LG: "24px",
    MD: "18px",
    SM: "14px",
  },
};

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <TodoList />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
