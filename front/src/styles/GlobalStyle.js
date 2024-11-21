import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: Arial, sans-serif;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  }


  /* li { list-style:none }
  img { vertical-align: top; } */

  /* 기본 inner 스타일 */
  .inner { 
    width:1400px; 
    margin:auto; 
    box-sizing:border-box; 
    position:relative 
  }

  /* 화면 크기에 따라 width를 조정 */
  @media (max-width: 1024px) {
    .inner {
      width: 90%;
    }
  }
  @media (max-width: 768px) {
    .inner {
      width: 95%;
    }
  }

  
  button { border:none; cursor: pointer;  }
`

export default GlobalStyle;
