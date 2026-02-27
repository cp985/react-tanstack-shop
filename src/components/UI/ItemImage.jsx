import sprite64x64 from "../../assets/sprite64x64.webp";

export default function ItemImage({ spritePosX, spritePosY, size = 64 }) {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundImage: `url(${sprite64x64})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `-${spritePosX}px ${spritePosY}px`,
    imageRendering: "pixelated",
    scale: "1.3",
    display: "inline-block",
  };

  return <div style={style} className="item-sprite" />;
}
