# 리액트 1주차 과제

## stateless 컴포넌트 구현

결과물
![](https://velog.velcdn.com/images/wjinss/post/6a6579cf-6aef-4c52-a09d-a55b89aea501/image.png)

### [1주차 과제 배포](https://wjinss-react-homework.netlify.app/)

### 컴포넌트

#### Section.jsx

data.js에서 데이터를 불러와 Profile컴포넌트에 값을 넘깁니다.

```jsx
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
```

#### Profile.jsx

Section컴포넌트에서 받은 값을 props로 받아 값을 할당하며, Figure, Button컴포넌트에 다시금 값을 넘깁니다.

```jsx
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
```

#### Figure.jsx

Profile컴포넌트에서 받은 값을 props로 받아 값을 할당합니다.

```jsx
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
```

#### Button.jsx

Profile컴포넌트에서 받은 값을 props로 받아 값을 할당합니다.

```jsx
import "./button.css";
export default function Button(props) {
  const text = `${props.label} 찜하기`;
  return (
    <button className="profile-button" type="button">
      {text}
    </button>
  );
}
```

### 컴포넌트 폴더구조

```md
components
└──atoms
└──button
├──button.css
└──Button.jsx
└──molecules
└──figure
├──figure.css
└──Figure.jsx
└──profile
├──profile.css
└──Profile.jsx
└──organisms
└──section
├──section.css
└──Section.jsx
```

아토믹 패턴을 사용해 컴포넌트를 분류했습니다.

## 회고

드디어 리액트를 배운다.

부트캠프를 듣기 전 인터넷 강의를 보면서 독학으로 리액트를 배웠지만, js와 마찬가지로 "잘 배웠냐" 라고 물으면 그냥 리액트가 뭔지는 안다.. 정도인 것 같다. 하지만 기억에 남는건 리액트는 편하고, 재밌다라는 것이다. 물론 그렇다고 해서 리액트는 쉽다? 도 아니다. 배우면서 엄청난 스트레스를 받았었고, 리액트를 경험만 해봤다~ 라고 말하는게 전부인 것 같다.

js 1주차 회고때도 말했듯 미리 배웠다고 설렁설렁 듣기보다는, 처음 배운다는 마음가짐으로 다시금 임하고 있다. 그래야 더 많이 배우고, 내 것으로 만들 수 있을거 같기 때문이다. 확실히 리액트가 js보다 더 재밌다. 컴포넌트로 분류해서 원하는 곳에 바로 넣을 수 있는게 너무 편하다. 재사용성과 하나의 목적만을 생각해 컴포넌트를 만들고 배치하는 것과 상태 관리 등등.. 생각해야 될 부분이 많지만 아직까지는 순조롭게 흘러가고 있다. 물론 리액트를 잘 다루기 위해선 js가 뒷받침 되어야한다. 결국 리액트는 js를 기반으로 동작하는 라이브러리니 js 공부를 미루지 말자.

어느새 수업을 들은 기간이 수료까지의 기간보다 많아졌다. 부트캠프를 들으면서 내 자신한테 "이 수업을 들으면서 내 것으로 만든게 있나?" 라는 물음을 자꾸만 던진다. 솔직히 아직까지는 완전히 내것으로 만든 것은 없는 것 같다. 이전보다 실력이 나아지고, 보는 시야가 넓어지긴 했지만 아직은 부족하다고 느낀다. 수료하고 후회하지 않게 남은 기간동안 더더욱 열심히 공부해야겠다.
