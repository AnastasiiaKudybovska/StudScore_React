import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`
const LoaderCircle = styled.div`
  border: 0.6em solid rgba(0, 0, 0, 0.3);
  border-top: 0.6em solid #b7094c;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  animation: ${spin} 0.9s linear infinite;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 20px
`
const LoaderWrapper = styled.div`
  height: 70vh;
  font-family: "Lora", serif;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
//   @media (max-width: 550px) {
//     height: 70vh;
//   }
  
`
const LoadingSpinner = () => {
    return (
        <LoaderWrapper>
            <LoaderCircle/> 
        </LoaderWrapper> 
    );
  };
  
  export default LoadingSpinner;
