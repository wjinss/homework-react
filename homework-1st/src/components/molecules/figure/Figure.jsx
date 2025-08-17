import "./figure.css";
export default function Figure(props) {
  return (
    <figure>
      <img src={props.image} alt={props.label} />
      <figcaption>
        <strong>{props.actor}</strong>
        <span>{props.heroName}</span>
      </figcaption>
    </figure>
  );
}
