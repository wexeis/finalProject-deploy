import React, {useContext, useState, useEffect} from "react";

import "./homeComp.css";
import ProductContext from "../Home/ProductContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function Home() {
  const {product} = useContext(ProductContext)
    const [currentIndex1, setCurrentIndex1] = useState(0);
	const [currentIndex2, setCurrentIndex2] = useState(0);

	const [currentIndex3, setCurrentIndex3] = useState(0);
	const [currentIndex4, setCurrentIndex4] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);



  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log(product)

  const otc = product.filter((item)=> item.categoryId == "64601589b7503cfd2a1fc405")
  const skinCare = product.filter((item)=> item.categoryId=="646017a4d6c25af8e2a6ac49")

  console.log("hello")
  console.log(skinCare)
  console.log(otc)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % product.length
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [product.length]);


  const [imageIndices, setImageIndices] = useState([]);







//   const productImages = product.map((item) => item.productImage);
//   console.log(productImages)
  return (
    <div className="homepage">
      <div className="background">
        <div className="container-home">
          <div className="banner">
		  <div className="right flex-r flex-50">
              <div className="image w-75  d-flex">
			  {product.length > 0 && (
                  <img
                    className="imageRight"
                    src={product[currentImageIndex].productImage}
                    alt=""
                  />
				  
                )}              </div>
            </div>
            <div className="left flex-50">
              <h1 className="bigFont-3">Lorem, ipsum dolor.</h1>
              <p className="m-top">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deserunt, fugiat nam repudiandae quis at voluptatum numquam vero
                beatae quidem dicta unde officiis, necessitatibus laborum
                molestiae!z
              </p>
            </div>
         
          </div>
        </div>
		<div class="parallax-container0">
</div>
      </div>
	  <h2 className="skin-care">Skin Care</h2>

    {/* <Slider {...settings}>
    {skinCare.map((product, index) => (
        <div key={index}>
          <h3>{product}</h3>
        </div>
      ))}
    </Slider> */}
	  {/* <div className="grid-container">
      {imageIndices.map((index, i) => (
        <img
          key={i}
          src={skinCare[index]?.productImage}
          alt={`Product ${index}`}
          className={`hover-effect item item${i + 1}`}
        />
      ))}
    </div> */}

<div className="products-show">
      {skinCare.map((product) => (
        <figure className="product-card" key={product._id}>
          <img src={product.productImage} alt={product.productName} className="product-card__image" />
          <figcaption className="product-card__caption">
            <header className="product-card__header">
              <h2 className="product-card__title">{product.productName}</h2>
              <p className="product-card__subtitle">{product.dosage}</p>
            </header>
            <footer className="product-card__footer">
              <span className="product-card__price">$19.99</span>
              {/* <button className="product-card__button">
                <i className="product-card__icon ri-add-line"></i>
              </button> */}
            </footer>
          </figcaption>
        </figure>
      ))}
    </div>
   
	<div class="parallax-container">
</div>
<h2 className="otc">OTC</h2>
<div className="products-show">
      {otc.map((product) => (
        <figure className="product-card" key={product._id}>
          <img src={product.productImage} alt={product.productName} className="product-card__image" />
          <figcaption className="product-card__caption">
            <header className="product-card__header">
              <h2 className="product-card__title">{product.productName}</h2>
              <p className="product-card__subtitle">{product.dosage}</p>
            </header>
            <footer className="product-card__footer">
              <span className="product-card__price">$19.99</span>
              {/* <button className="product-card__button">
                <i className="product-card__icon ri-add-line"></i>
              </button> */}
            </footer>
          </figcaption>
        </figure>
      ))}
    </div>
        
              

    </div>
  );
}
