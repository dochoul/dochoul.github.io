---
layout: post
title: "필요해서 직접 만든 툴팁 컴포넌트"
author: "kimdy"
date: 2026-05-07
categories: "dev"
description: "딱 맞는 툴팁 라이브러리가 없어서 React와 TypeScript로 직접 만들었다."
---

세상에 툴팁 라이브러리가 없는 것도 아닌데, 나는 굳이 직접 만들었다.

react-tooltip도 써봤고, tippy.js도 써봤다. 쓸 때마다 드는 생각은 항상 비슷했다. 기능은 많은데 내가 원하는 딱 그 형태로 쓰려면 설정을 한참 뒤져야 하거나, 스타일을 덮어쓰다 보면 어느새 CSS 씨름을 하고 있거나. 결국 "이럴 시간에 그냥 만들자"는 결론에 도달하는 데 그리 오래 걸리지 않았다.

개발자의 고질병이다.

---

만든 건 React와 TypeScript로 된 툴팁 컴포넌트다. 쓰는 방법은 간단하다.

```jsx
import Tooltip from "./components/ui/Tooltip";

<Tooltip label="안녕하세요">
  <button>호버하세요</button>
</Tooltip>
```

위치는 `top`, `bottom`, `left`, `right` 에 `start`/`end` 변형까지 총 12가지. 색상, 배경, 폰트 크기, 간격도 props로 바로 넘기면 된다.

```jsx
<Tooltip
  label="안녕하세요"
  position="top"
  color="#fff"
  background="#585858"
  fontSize={16}
  offset={10}
>
  <button>커스텀 툴팁</button>
</Tooltip>
```

HTML도 된다. label에 `<br/>`, `<strong>` 같은 태그를 그냥 넣으면 렌더링된다. 필요한 것만 있고 없어도 되는 건 없는, 딱 내가 원하는 형태로 나왔다.

뭔가 만들고 싶은 게 생기면 라이브러리 탓을 하게 된다. 그리고 그게 나쁘지 않다.

데모는 [여기](https://tooltip-react-eight.vercel.app/), 코드는 [GitHub](https://github.com/dochoul/tooltip-react).
