import React, {useContext, useState, useEffect} from "react";

import "./homeComp.css";
import ProductContext from "../Home/ProductContext";




export default function Home() {
  const {product} = useContext(ProductContext)

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log(product)

  const otc = product.filter((item)=> item.categoryId == "64601589b7503cfd2a1fc405")
  console.log("hello")
  console.log(otc)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % product.length
      );
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [product.length]);
console.log(currentImageIndex)


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
    
	 <div className="grid-container">
	    <img src="https://i0.wp.com/www.pharmaholic.net/wp-content/uploads/2022/02/aqua_therapy_-_web_mobile_banner_final_0_0.jpg?fit=640%2C450&ssl=10"    className="hover-effect item item1"/>
		<img src="https://i0.wp.com/www.pharmaholic.net/wp-content/uploads/2022/02/filorga_ncef_reverse_reg_supreme_regenerating_cream_50ml_130035_1614092771_main.jpg?fit=400%2C400&ssl=1"  className="hover-effect item item2" />
    <img src="https://blogscdn.thehut.net/wp-content/uploads/sites/31/2018/05/22150126/Hydrabio-range-lifestyle.jpg" className="hover-effect item item3" />
	<img src="https://i2.wp.com/www.pharmaholic.net/wp-content/uploads/2022/02/5bc0a240e79e0_banner_kit-1.jpg?fit=995%2C569&ssl=1" class="hover-effect item item4"/>

	</div>
   
	<div class="parallax-container">
</div>
<h2 className="otc">OTC</h2>
    <div className="products">
		<figure class="product-card">
			<img src="https://m.media-amazon.com/images/I/71I5Wqo7eZL._AC_SX679_.jpg" alt="Face mask" class="product-card__image" />
			<figcaption class="product-card__caption">
				<header class="product-card__header">
					<h2 class="product-card__title">Face mask</h2>
					<p class="product-card__subtitle">Charcoal</p>
				</header>
				<footer className="product-card__footer">
					<span className="product-card__price">$19.99</span>
					<button class="product-card__button">
						<i class="product-card__icon ri-add-line"></i>
					</button>
				</footer>
			</figcaption>
		</figure>

    <figure class="product-card">
			<img src="https://m.media-amazon.com/images/I/818VNiJEWqL._AC_SX679_.jpg" alt="Face mask" class="product-card__image" />
			<figcaption className="product-card__caption">
				<header className="product-card__header">
					<h2 className="product-card__title">Face mask</h2>
					<p className="product-card__subtitle">Charcoal</p>
				</header>
				<footer className="product-card__footer">
					<span className="product-card__price">$19.99</span>
					<button className="product-card__button">
						<i className="product-card__icon ri-add-line"></i>
					</button>
				</footer>
			</figcaption>
		</figure>

    <figure class="product-card">
			<img src="https://m.media-amazon.com/images/I/71sFyWwZ3SL._AC_SX466_.jpg" alt="Face mask" class="product-card__image" />
			<figcaption className="product-card__caption">
				<header className="product-card__header">
					<h2 className="product-card__title">Face mask</h2>
					<p className="product-card__subtitle">Charcoal</p>
				</header>
				<footer className="product-card__footer">
					<span className="product-card__price">$19.99</span>
					<button className="product-card__button">
						<i className="product-card__icon ri-add-line"></i>
					</button>
				</footer>
			</figcaption>
		</figure>

    <figure class="product-card">
			<img src="https://m.media-amazon.com/images/I/81eobl+tIRS._AC_SX679_.jpg" alt="Face mask" class="product-card__image" />
			<figcaption className="product-card__caption">
				<header className="product-card__header">
					<h2 className="product-card__title">Face mask</h2>
					<p className="product-card__subtitle">Charcoal</p>
				</header>
				<footer className="product-card__footer">
					<span className="product-card__price">$19.99</span>
					<button className="product-card__button">
						<i className="product-card__icon ri-add-line"></i>
					</button>
				</footer>
			</figcaption>
		</figure>

    </div>
    </div>
  );
}
