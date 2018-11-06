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

clearfix 클래스를 추가하여 floated content를 쉽게 clear할 수 있습니다.

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

## Display Property

Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.

```html
<div class="d-inline">d-inline</div>
<span class="d-block">d-block</span>
<span class="d-inline-block">d-inline-block</span>
<span class="d-none">d-none</span>
<span class="d-table">d-table</span>
<span class="d-table-row">d-table-row</span>
<span class="d-table-cell">d-table-cell</span>
```

## Sizing

Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.

```html
<div class="w-5">width 5%</div>
<div class="w-10">width 10%</div>
<div class="w-15">width 15%</div>
<div class="w-20">width 20%</div>
		...
<div class="w-90">width 90%</div>
<div class="w-95">width 95%</div>
<div class="w-100">width 100%</div>
<div class="w-auto">Width auto</div>
```

[Example](https://codepen.io/dochoul/pen/XybqZO)

## Spacing

Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.

```html
<div class="m-10">m - for classes that set margin</div>  //margin: 10px;
<div class="ml-10">p - for classes that set margin</div> //margin-left: 10px;
<div class="mr-10">p - for classes that set margin</div> //margin-right: 10px;
<div class="mt-10">p - for classes that set margin</div> //margin-top: 10px;
<div class="mb-10">p - for classes that set margin</div> //margin-bottom: 10px;
<div class="mv-10">p - for classes that set margin</div> //margin: 10px 0;
<div class="mh-10">p - for classes that set margin</div> //margin: 0 10px;

<div class="p-10">p - for classes that set padding</div>  //padding: 10px;
<div class="pl-10">p - for classes that set padding</div> //padding-left: 10px 0;
<div class="pr-10">p - for classes that set padding</div> //padding-right: 10px 0;
<div class="pt-10">p - for classes that set padding</div> //padding-top: 10px 0;
<div class="pb-10">p - for classes that set padding</div> //padding-bottom: 10px 0;
<div class="pv-10">p - for classes that set padding</div> //padding: 10px 0;
<div class="ph-10">p - for classes that set padding</div> //padding: 0 10px;

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
<div class="text-nowrap" style="width:200px; background:khaki">모든 국민은 그 보호하는 자녀에게 적어도 초등교육과 법률이 정하는 교육을 받게 할 의무를 진다.</div>
<p class="text-truncate" style="width:200px; background:khaki">국가원로자문회의의 직무범위 기타 필요한 사항은 법률로 정한다. 정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.
</p>
<p class="text-lowercase">APPLE(소문자로 변환됩니다)</p>
<p class="text-uppercase">apple(대문자로 변환됩니다)</p>
<p class="text-capitalize">apple banana orange(단어의 첫글자만 대문자로 변환됩니다)</p>
```
[Example](https://codepen.io/dochoul/pen/mQyMQM)

## Vertical alignment

display table 속성을 이용하여 높이를 알 수 없는 division의 수직 정렬을 구현합니다.

```html
<div class="d-table" style="height:100px">
  <span class="d-table-cell align-top">top</span>
  <span class="d-table-cell align-middle">middle</span>
  <span class="d-table-cell align-bottom">bottom</span>
</div>
```
[Example](https://codepen.io/dochoul/pen/oQgeEx)


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

## Embeds

Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.

```html
<div class="embed-responsive embed-responsive-16by9">
  <iframe src="https://www.youtube.com/embed/qeMFqkcPYcg" allowfullscreen></iframe>
</div>
```

[Example](https://codepen.io/dochoul/pen/ZmGoYx)
