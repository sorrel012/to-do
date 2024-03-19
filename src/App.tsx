import React from 'react';
import { createGlobalStyle } from 'styled-components';
import ToDoList from './views/ToDoList';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  html, body, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none; 
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    height: 100vh;
    font-family: "GmarketSansMedium", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(#fdf8e0, #ece4ff);
  }

  input, button, form, select {
    font-family: "GmarketSansMedium", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue";
  }
  
  .material-symbols-outlined {
    font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24
  }

  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 200ms ease-in;
  }
  
  #main-todos .todo-list {
    height: 80%;
    text-align: left;
    padding: 20px;
  }
  #main-todos .todo-list li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }
  #main-todos .todo-list li .checkbox {
    width: 10px;
    height: 10px;
    border: 1px solid grey;
    border-radius: 3px;
    margin-right: 5px;
  }
  #main-todos .todo-list li .text {
    flex-grow: 1;
    margin-right: 10px;
    color: #484848;
    font-size: large;
  }
  #main-todos .todo-list li button {
    border: none;
    background-color: #fff;
    cursor: pointer;
    border-radius: 50%;
    color: #ab0000;
  }
  #main-todos .todo-new {
    height: 10%;
    width: 100%;
    border-top: 1px dashed #8672a2;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #main-todos .todo-new label {
    margin-right: 10px;
  }
  #main-todos .todo-new input {
    flex-grow: 1;
    margin-right: 10px;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
  }
  #main-todos .todo-new button {
    border: none;
    background-color: #fff;
    cursor: pointer;
    border-radius: 50%;
  }
  #main-todos .todo-new button:focus-visible {
    outline: none;
  }

  .modal {
    top: 40%;
    border: none;
    border-radius: 6px;
    padding: 0.3rem 1.5rem;
    width: 20rem;
    max-width: 90%;
    z-index: 10;
    text-align: center;
  }
  .modal .button-group {
    width: 60%;
    margin: 16px auto;
    display: flex;
    justify-content: space-evenly;
  }
  .modal .confirm-button {
    border: none;
    border-radius: 5px;
    padding: 7px 10px 5px;
    font-size: large;
    color: white;
    cursor: pointer;
    background-color: #6a48ab;
  }
  .modal .confirm-button:hover {
    background-color: #3b1c75;
  }
  .modal .cancel-button {
    border: none;
    border-radius: 5px;
    padding: 7px 10px 5px;
    font-size: large;
    color: white;
    cursor: pointer;
    background-color: #3085d6;
  }
  .modal .cancel-button:hover {
    background-color: #203eb9;
  }
  .modal .delete-button {
    border: none;
    border-radius: 5px;
    padding: 7px 10px 5px;
    font-size: large;
    color: white;
    cursor: pointer;
    background-color: #d33;
  }
  .modal .delete-button:hover {
    background-color: #c20000;
  }

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;
