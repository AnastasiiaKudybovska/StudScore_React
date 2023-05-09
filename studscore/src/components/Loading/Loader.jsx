import styled, { keyframes } from 'styled-components'
import image from ".././images/waiting0.gif";
import { FaGem} from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`
const LoaderWrapper = styled.div`
  height: 83vh;
  font-family: "Lora", serif;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 550px) {
    height: 70vh;
  }
  
`
const LoaderCont = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10rem 15rem;
  @media (max-width: 655px) {
    padding: 5rem 0
  }
  
`
const LoaderCircle = styled.div`
  border: 0.6em solid rgba(0, 0, 0, 0.3);
  border-top: 0.6em solid #b7094c;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  margin-top: 2rem;
  animation: ${spin} 0.9s linear infinite;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 20px
`
const IMGLoading = styled.img`
  position: absolute;
  bottom: 0px;
  right: 10px;
  @media (max-width: 655px) {
    right: 0;
   bottom: -150px
  }
`
const spinGem = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const FaGemCust = styled.div`
  font-size: 1.2em;
  position:absolute;
  right: 210px;
  bottom:120px;
  animation: ${spinGem} 1.5s linear infinite;
  @media (max-width: 655px) {
    left: -35px;
    bottom: -30px
   
  }
`

const Loader = () => {
    return (
      <LoaderWrapper>
        <LoaderCont>
            <h2>Завантаження</h2>
            <LoaderCircle/>
            <FaGemCust>
                <FaGem className="fa fa-gem load-fa-gem" style={{fontSize:"0.7em"}}/> 
            </FaGemCust>
            <IMGLoading src={image} alt="image" />
        </LoaderCont>      
      </LoaderWrapper>
    );
  };
  
  export default Loader;
