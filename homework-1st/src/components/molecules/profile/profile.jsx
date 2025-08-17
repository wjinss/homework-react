import "./profile.css";
import Button from "../../atoms/button/button.jsx";
import Figure from "../figure/Figure.jsx";

export default function Profile(props) {
  return (
    <div className="profile">
      <Figure
        image={props.image}
        alt={props.label}
        actor={props.actor}
        nickname={props.nickname}
        heroName={props.heroName}
      />
      <div className="caption">
        <dl className="characteristic">
          <dt>배우</dt>
          <dd>{props.actorkr}</dd>
          <dt>출연작</dt>
          <dd className="movie-list">{props.filmography}</dd>
          <dt>별명</dt>
          <dd>{props.nickname}</dd>
        </dl>
        <Button label={props.label} />
      </div>
    </div>
  );
}
