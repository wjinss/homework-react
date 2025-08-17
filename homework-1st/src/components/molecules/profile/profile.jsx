import "./profile.css";
import Button from "@/components/atoms/button/button";
export default function Profile() {
  return (
    <div className="profile">
      <figure>
        <img src="/images/sam-spa.webp" alt="" />
        <figcaption>
          <strong>Tobey Maguire</strong>
          <span>Spider Man</span>
        </figcaption>
      </figure>
      <div className="caption">
        <dl className="characteristic">
          <dt>배우</dt>
          <dd>토비 맥과이어</dd>
          <dt>출연작</dt>
          <dd className="movie-list">
            스파이더맨, 스파이더맨2, 스파이더맨3, 스파이더맨: 노 웨이 홈
          </dd>
          <dt>별명</dt>
          <dd>어둠의 댄서, 불리 맥과이어</dd>
        </dl>
        <Button />
      </div>
    </div>
  );
}
