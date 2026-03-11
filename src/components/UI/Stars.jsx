import classStars from "./style/Stars.module.css";

export default function Stars({rating}){

    const percentage = (rating / 5) * 100;

  return (
    <div className={classStars['stars-outer']}>
      ★★★★★
      <div className={classStars['stars-inner']} style={{ width: `${percentage}%` }}>
        ★★★★★
      </div>
    </div>
  );
}