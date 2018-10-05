---
layout: post
title: "프로젝트 모든 요소에 사용할 수있는 CSS 유틸리티 속성 집합"
author: "kimdy"
categories: "gtris"
tags: "css, utilities"
---

## Get started

Copy-paste the stylesheet <link> into your <head> before all other stylesheets to load our CSS.

```html
<link rel="stylesheet" href="https://dochoul.github.io/utilities.css">
```
## Float

Toggle floats on any element, across any breakpoint, using our responsive float utilities.

```html
<div class="float-left">Float left</div>
<div class="float-right">Float right</div>
```

## Clearfix

Quickly and easily clear floated content within a container by adding a clearfix utility.

```html
<div class="clearfix">...</div>
```

```scss
// Mixin itself
@mixin clearfix() {
  &::after {
    display: block;
    content: "";
    clear: both;
  }
}

// Usage as a mixin
.element {
  @include clearfix;
}
```

## Colors

Convey meaning through color with a handful of color utility classes. Includes support for styling links with hover states, too.

```html
<p class="text-primary">text-primary</p>
<p class="text-orange">text-orange</p>
<p class="bg-white">bg-white</p>
<p class="bg-black">bg-black</p>
```

## Background Colors

Similar to the contextual text color classes, easily set the background of an element to any contextual class. Anchor components will darken on hover, just like the text classes. Background utilities do not set color, so in some cases you’ll want to use .text-* utilities.

```html
<div class="bg-primary">bg-primary</div>
<div class="bg-orange">bg-orange</div>
<div class="bg-white">bg-white</div>
<div class="bg-black">bg-black</div>
```

## Display Property

Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.

```html
<div class="d-inline">d-inline</div>
<div class="d-inline">d-inline</div>
<span class="d-block">d-block</span>
<span class="d-block">d-block</span>
```

## Sizing

Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.

```html
<div class="w-25">Width 25%</div>
<div class="w-50">Width 50%</div>
<div class="w-75">Width 75%</div>
<div class="w-100">Width 100%</div>
<div class="w-auto">Width auto</div>
```

## Spacing

Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.

```html
<div class="p-10">p - for classes that set padding</div>
<div class="m-10">m - for classes that set margin</div>
<div class="mx-auto" style="width:200px">Centered element</div>
```

## Text

Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.

```html
<p class="text-justify">제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다. 군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. 군사법원의 조직·권한 및 재판관의 자격은 법률로 정한다. 국회의원은 법률이 정하는 직을 겸할 수 없다.
</p>
<p class="text-left">왼쪽으로 정렬됩니다</p>
<p class="text-center">가운데로 정렬됩니다</p>
<p class="text-right">오른쪽으로 정렬됩니다</p>
<div class="text-nowrap bg-primary" style="width:100px">모든 국민은 그 보호하는 자녀에게 적어도 초등교육과 법률이 정하는 교육을 받게 할 의무를 진다.</div>
<p class="truncate" style="width:200px">국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.
</p>
<p class="text-lowercase">소문자로 변환됩니다</p>
<p class="text-uppercase">대문자로 변환됩니다</p>
<p class="text-capitalize">대문자로 시작합니다</p>
```

## Vertical alignment

Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.

```html
<div class="d-table-row" style="height:100px">
  <span class="d-table-cell align-top">top</span>
  <span class="d-table-cell align-middle">middle</span>
  <span class="d-table-cell align-bottom">bottom</span>
</div>
```

## Cursor Property

Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.

```html
<span class="c-hand">c-hand</span>
<span class="c-move">c-move</span>
<span class="c-zoom-in">c-zoom-in</span>
<span class="c-zoom-out">c-zoom-out</span>
<span class="c-not-allowed">c-not-allowed</span>
<span class="c-col-resize">c-col-resize</span>
<span class="c-auto">c-auto</span>
```

## Loading

Loading indicator is used for loading or updating. You can add the loading class to a container for loading status.

```html
<div class="loading"></div>
```

## Embeds

Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.

```html
<div class="embed-responsive embed-responsive-16by9">
  <iframe src="https://www.youtube.com/embed/qeMFqkcPYcg" allowfullscreen></iframe>
</div>
```