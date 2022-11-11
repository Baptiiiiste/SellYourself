import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./arrows.jsx";
import usePreventBodyScroll from "./usePreventBodyScroll.jsx";
import { Card } from "./card.jsx";
import './HeaderCategories.css';
import { useNavigate } from 'react-router-dom';
import { categories } from "../../assets/data"


function HeaderCategories() {
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const navigate = useNavigate();

  const setCategorie = (categorie) => {
    // if(categorie != undefined){
    //   navigate("/" + categorie);
    // }
    console.log(categorie);
  }

  return (
    <div>
      <div className="HeaderCategories-container">
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
          >
            {categories.map(({ name }, index) => (
              <button className="HeaderCategories-button" onClick={setCategorie(name)}>
                <Card name={name} key={index} />
              </button>
            ))}

          </ScrollMenu>
        </div>
      </div>
      </div>
    );
  }

  function onWheel(apiObj, ev) {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
  
    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }
  
    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  }

  
  export default HeaderCategories;
  
