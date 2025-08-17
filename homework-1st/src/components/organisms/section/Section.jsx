import "./section.css";
import Profile from "../../molecules/profile/Profile.jsx";
import HERO_INFO from "../../../data/data.js";

export default function Section() {
  return (
    <section className="profile-section">
      {HERO_INFO.map((list) => (
        <Profile
          key={list.id}
          image={list.image}
          actor={list.actor}
          actorkr={list.actorkr}
          heroName={list.heroName}
          label={list.label}
          filmography={list.filmography}
          nickname={list.nickname}
        />
      ))}
    </section>
  );
}
