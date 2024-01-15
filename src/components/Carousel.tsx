import { useState } from "react"

const IMAGE_1_URL = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
const IMAGE_2_URL = "https://images.unsplash.com/photo-1606117331085-5760e3b58520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
const IMAGE_3_URL = "https://images.unsplash.com/photo-1667971286579-63a5222780ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"

const IMAGE_LIST = [IMAGE_1_URL, IMAGE_2_URL, IMAGE_3_URL]

export default function Carousel(){
  const [activeImage, setActiveImage] = useState(1);

  return(
    <>
      <div className="carousel">
        <ul className="carousel__slides">
          {IMAGE_LIST.map((image, index, images) => {
            return (
              <div key={image}>
                <input type="radio" name="radio-buttons" id={`img-${index + 1}`} checked={activeImage === index} readOnly />
                <li className="carousel__slide-container">
                  <div className="carousel__slide-img">
                    <img alt="scenery 1" src={image} />
                  </div>
                  <div className="carousel__controls">
                    <label onClick={() => setActiveImage(getPrevIndex(images.length, index))} className="carousel__slide-prev" key={'prev'+index}>
                      <span>&lsaquo;</span>
                    </label>
                    <label onClick={() => setActiveImage(getNextIndex(images.length, index))} className="carousel__slide-next" key={'next'+index}>
                      <span>&rsaquo;</span>
                    </label>
                  </div>
                </li>
              </div>
            )
          })}

          <div className="carousel__dots">
            {IMAGE_LIST.map((image, index) => (
              <label onClick={() => setActiveImage(index)} className="carousel__dot" id={`img-dot-${index + 1}`} key={`img-dot-${index + 1}`}></label>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
}

function getPrevIndex(length: number, currentIndex: number) {
  const prevIndex = currentIndex - 1
  if (prevIndex < 0) {
    // 마지막 인덱스
    return length - 1
  }

  return prevIndex
}

function getNextIndex(length: number, currentIndex: number) {
  const nextIndex = currentIndex + 1
  if (nextIndex >= length) {
    return 0
  }

  return nextIndex
}