# Quest 02. CSS의 기초와 응용

## Introduction
* CSS는 Cascading StyleSheet의 약자입니다. 웹브라우저에 표시되는 HTML 문서의 스타일을 지정하는 (거의) 유일하지만 다루기 쉽지 않은 언어입니다. 이번 퀘스트를 통해 CSS의 기초적인 레이아웃 작성법을 알아볼 예정입니다.

## Topics
* CSS의 기초 문법과 적용 방법
  * Inline, `<style>`, `<link rel="stylesheet" href="...">`
* CSS 규칙의 우선순위
* 박스 모델과 레이아웃 요소
  * 박스 모델: `width`, `height`, `margin`, `padding`, `border`, `box-sizing`
  * `position`, `left`, `top`, `display`
  * CSS Flexbox와 Grid
* CSS 표준의 역사
* 브라우저별 Developer tools

## Resources
* [MDN - CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
* [Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)
* [A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [그리드 레이아웃과 다른 레이아웃 방법과의 관계](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout/%EA%B7%B8%EB%A6%AC%EB%93%9C_%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83%EA%B3%BC_%EB%8B%A4%EB%A5%B8_%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83_%EB%B0%A9%EB%B2%95%EA%B3%BC%EC%9D%98_%EA%B4%80%EA%B3%84)

## Checklist
* CSS를 HTML에 적용하는 세 가지 방법은 무엇일까요?세 가지 방법 각각의 장단점은 무엇일까요?
  ```
  * 인라인 스타일 : 태그에 직접 스타일을 지정할 때 편리,높은 우선순위 / HTML과 섞여 사용되어 관리가 어렵고 의도치않게 오버라이딩 될 수도
  * 내부 스타일 시트 : 코드 재사용,관리용이 / css를 수정해야할 시 적용된 html 문서 전부다 하나하나 수정해야함
  * 외부 스타일 시트 : 재사용,관리하기가 압도적으로 용이
  ```
  
* CSS 규칙의 우선순위는 어떻게 결정될까요?
  * 스타일 우선순위 : 스타일 규칙의 중요도와 적용범위에 따라 우선선위가 결정,우선순위에 따라 위에서 아래로 적용
    ```
    중요도 순
     1. 사용자(user) 스타일 -> 2.제작자 스타일 -> 3.브라우저 기본 스타일 순으로 우선순위 결정
    
    적용범위 순
     1. !important(스타일규칙에 붙임) -> 2.인라인 스타일 -> 3.id 스타일 -> 4.클래스 스타일 -> 5. 타입 스타일
    
    작성순서 순
     위에서 아래로, 동일한 선택자의 경우 덮어 씌움 
    ``` 
* CSS의 박스모델은 무엇일까요? 박스가 화면에서 차지하는 크기는 어떻게 결정될까요?
  ```
  * 웹 문서의 내용을 박스 형태로 정의하는 것
  * 콘텐츠영역 + 패딩 + 테두리 + 마진 등의 요소로 크기가 결정
  ```
* `float` 속성은 왜 좋지 않을까요?
  ```
  * float 이후의 요소들도 다 float속성을 자동으로 가지게 되서 직접 풀어줘야하는 번거로움이 있다.
  ```
* Flexbox(Flexible box)와 CSS Grid의 차이와 장단점은 무엇일까요?
  ```
  * 1차원이냐 2차원이냐의 차이
  * flexbox는 주축을 기준으로 작성(수평,수직 중 하나 선택), 행과 열을 효율적으로 정렬 및 구성하므로 비교적 작은 단위의 레이아웃에 적합
  * css Grid는 수평,수직 전부 사용,큰 단위 레이아웃에 적합
  ```
* CSS의 비슷한 요소들을 어떤 식으로 정리할 수 있을까요?
  ```
  * 그룹화 시켜서 정리
  ```
## Quest
* Quest 01에서 만들었던 HTML을 바탕으로, [이 그림](screen.png)의 레이아웃과 CSS를 최대한 비슷하게 흉내내 보세요. 꼭 완벽히 정확할 필요는 없으나 align 등의 속성은 일치해야 합니다.
* **주의사항: 되도록이면 원래 페이지의 CSS를 참고하지 말고 아무것도 없는 백지에서 시작해 보도록 노력해 보세요!**

## Advanced
* 왜 CSS는 어려울까요?
 ```
 1. 어떤 CSS 규칙이 최종적으로 적용될지 예측하기 어렵다
 2. CSS 규칙의 상호작용을 모두 알기 어렵다
 3. 런타임 환경을 예상하기 어렵다
 ```
* CSS의 어려움을 극복하기 위해 어떤 방법들이 제시되고 나왔을까요?
 ```
  1. BEM(이름이 중복되지않도록 CSS아이디와 클래스를 명명)과 CSS module 도입
  2. 하나하나씩 해보면서 공부
  3. 어떤 런타인 환경을 대상으로 할 지를 정하고 이 환경을 확실히 지원(전부다 완벽하게 동작하는 css를 작성하는 것은 어려움)
 ```
* CSS가 브라우저에 의해 해석되고 적용되기까지 내부적으로 어떤 과정을 거칠까요?
* 웹 폰트의 경우에는 브라우저 엔진 별로 어떤 과정을 통해 렌더링 될까요?
