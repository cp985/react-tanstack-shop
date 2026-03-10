import sprite64x64 from "../../assets/sprite64x64.webp";
import classItemImage from './style/ItemImage.module.css'
import barbem from '../../assets/barbasvg.svg'
export default function ItemImage({id, spritePosX, spritePosY, size = 64 }) {
  const style = {
    width:id !== 'item-101' ? `${size}px` : `74px`,
    height: id !== 'item-101' ? `${size}px` : `80px`,
    backgroundImage:id !== 'item-101' ? `url(${sprite64x64})` : `url(${barbem})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `-${spritePosX}px ${spritePosY}px`,
    imageRendering: "pixelated",
    scale: "1.3",
    display: "inline-block",
  };

  return <div style={style} className={classItemImage["item-sprite"]} />;
}
