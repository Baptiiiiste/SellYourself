import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./arrows.jsx";
import usePreventBodyScroll from "./usePreventBodyScroll.jsx";
import { Card } from "./card.jsx";
import './HeaderCategories.css';
import HeaderCustom from "../HeaderCustom/index"



const categories = [
  
  { name: "Graphisme"},
  { name: "Musique"},
  { name: "Programmation"},
  { name: "Ecriture"},
  { name: "Design UI/UX"},
  { name: "Vidéo"},
  { name: "Animation"},
  { name: "Traduction"},
  { name: "Immobilier"},
  { name: "Automobile"},
  { name: "Automobile"},
  { name: "Automobile"},
  { name: "Automobile"},
  { name: "Automobile"},
  { name: "Automobile"},
  { name: "Automobile"},
  { name: "Automobile"},
  { name: "Automobile"},
  { name: "Automobile"},
  { name: "Automobile"},
  { name: "Automobile"},
  { name: "Automobile"},
]


function HeaderCategories() {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <div>

    
    <HeaderCustom title="homePage"/>
      <div className="HeaderCategories-container">
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
          >
            {categories.map(({ name }, index) => (
              <Card
                name={name}
                key={index}
              >
              </Card>
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
  
