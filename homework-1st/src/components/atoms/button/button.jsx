import "./button.css";
export default function Button(props) {
  const text = `${props.label} 찜하기`;
  return (
    <button className="profile-button" type="button">
      {text}
    </button>
  );
}
