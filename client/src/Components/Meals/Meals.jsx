import React from "react";

const MealsView = () => {
  return (
    <div>
      <div className="main-dish">
        <div className="main-dish__title">Spagetti Native</div>
        <div className="main-dish__item">
          <div className="main-dish__item--description">
            <img
              src="./assets/images/spaghetti.jpg"
              alt="spagetti"
              className="dish-item--img"
            />
            <div className="dish-item-desc">
              <span>Spagetti &amp; Chicken</span>
              <p>Spagetti spiced with shrimp and chicken to go!... yaay!</p>
              <p>
                A choice made by legends in the game, specially for you and your
                own!
              </p>
            </div>
            <div className="dish-item-price">
              <span>$10.20</span>
              <button className="add-btn">Add to Menu</button>
            </div>
          </div>
        </div>
        <div className="main-dish__item">
          <div className="main-dish__item--description">
            <img
              src="./assets/images/spaghetti.jpg"
              alt="spagetti"
              className="dish-item--img"
            />
            <div className="dish-item-desc">
              <span>Spagetti &amp; Chiken Curry</span>
              <p>
                Spagetti spiced with curry sauce and chicken to go!... great
                choice!
              </p>
              <p>
                A choice made by legends in the game, specially for you and your
                own!
              </p>
            </div>
            <div className="dish-item-price">
              <span>$10.20</span>
              <button className="add-btn">Add to Menu</button>
            </div>
          </div>
        </div>
      </div>
      <div className="main-dish">
        <div className="main-dish__title">Spagetti for Veggies</div>
        <div className="main-dish__item">
          <div className="main-dish__item--description">
            <img
              src="./assets/images/spaghetti.jpg"
              alt="spagetti"
              className="dish-item--img"
            />
            <div className="dish-item-desc">
              <span>Spagetti &amp; Chicken</span>
              <p>Spagetti spiced with shrimp and chicken to go!... yaay!</p>
              <p>
                A choice made by legends in the game, specially for you and your
                own!
              </p>
            </div>
            <div className="dish-item-price">
              <span>$10.20</span>
              <button className="add-btn">Add to Menu</button>
            </div>
          </div>
        </div>
        <div className="main-dish__item">
          <div className="main-dish__item--description">
            <img
              src="./assets/images/spaghetti.jpg"
              alt="spagetti"
              className="dish-item--img"
            />
            <div className="dish-item-desc">
              <span>Spagetti &amp; Chiken Curry</span>
              <p>
                Spagetti spiced with curry sauce and chicken to go!... great
                choice!
              </p>
              <p>
                A choice made by legends in the game, specially for you and your
                own!
              </p>
            </div>
            <div className="dish-item-price">
              <span>$10.20</span>
              <button className="add-btn">Add to Menu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsView;
