var ultimaPosicao = 0;
window.addEventListener( "scroll", () => {
  var nav = document.querySelector( "header nav" );
  var atualPosicao = window.scrollY;

  if ( atualPosicao > ultimaPosicao && atualPosicao > 0 ) {
    nav.classList.remove( "sticky" );
    nav.style.top = "-60px";
  } else {
    nav.classList.add( "sticky" );
    nav.style.top = "0px";
  }
  if ( atualPosicao < 80 ) {
    nav.classList.remove( "sticky" );
    nav.style.top = "0px";
  }
  ultimaPosicao = atualPosicao;
} );
var menuLinks = document.querySelectorAll( 'header nav ul.nav a[href^="#"]' );
var a = document.querySelectorAll( 'header a[href^="#home"]' );

function getDistanceFromTheTop ( element ) {
  const id = element.getAttribute( "href" );
  return document.querySelector( id ).offsetTop;
}

function scrollToSection ( event ) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop( event.target ) - 0;
  smoothScrollTo( 0, distanceFromTheTop );
}

menuLinks.forEach( ( link ) => {
  link.addEventListener( "click", scrollToSection );
} );

function smoothScrollTo ( endX, endY, duration ) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 1000;

  const easeInOutQuart = ( time, from, distance, duration ) => {
    if ( ( time /= duration / 2 ) < 1 )
      return ( distance / 2 ) * time * time * time * time + from;
    return ( -distance / 2 ) * ( ( time -= 2 ) * time * time * time - 2 ) + from;
  };

  const timer = setInterval( () => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart( time, startX, distanceX, duration );
    const newY = easeInOutQuart( time, startY, distanceY, duration );
    if ( time >= duration ) {
      clearInterval( timer );
    }
    window.scroll( newX, newY );
  }, 1000 / 60 );
}


/* --------------------------carrossel--------------------------- */

// iniciar variaveis------------------------------------------
let slideIndex = 1;
let centerItem;
let itemTimeLine = document.querySelectorAll( "body main section#chronology ul.time-line li" );
for ( let index = 0; index < itemTimeLine.length; index++ ) {
  centerItem = ( ( window.innerWidth / 2 ) - ( itemTimeLine[ 0 ].clientWidth / 2 ) );
  itemTimeLine[ index ].style.transform = `translateX(${ centerItem }px)`;

}

let dots = document.querySelectorAll( "body main section#chronology ul.time-line li" );
for ( let index = 0; index < dots.length; index++ ) {
  dots[ index ].addEventListener( "click", () => {

    currentSlide( index );

  } );
}

let slides = document.querySelectorAll( "body main section#chronology ul.slideshow-container li.mySlides" );

// funçoes---------------------------------------
showSlides();


// startSlideInterval();
function showSlides () {
  for ( let index = 0; index < itemTimeLine.length; index++ ) {
    let positionItem = centerItem - ( ( window.innerWidth / 100 * 20 ) * ( slideIndex - 1 ) );
    itemTimeLine[ index ].style.transform = `translateX(${ positionItem }px)`;
  }

  for ( let i = 0; i < slides.length; i++ ) {
    slides[ i ].className = slides[ i ].className.replace( "fade", "" );
  }

  for ( let i = 0; i < dots.length; i++ ) {
    dots[ i ].className = dots[ i ].className.replace( " active", "" );
  }

  dots[ slideIndex - 1 ].className += " active";
  slides[ slideIndex - 1 ].className += " fade";
}


function currentSlide ( numberSlide ) {
  clearInterval( slideInterval );

  console.log( slideIndex, numberSlide );


  slideIndex = numberSlide + 1;
  showSlides();
}

/* ++++++++++++++++++++++++++++Setas do carrossel++++++++++++++++++++++++++++ */
var slideInterval;
function startSlideInterval () {

  slideInterval = setInterval( () => {
    slideIndex += 1;
    if ( slideIndex > slides.length ) {
      slideIndex = 1;
    }
    showSlides();

  }, 10000 );
}

let arrows = document.querySelectorAll( "body main section#chronology a.arrow" );
for ( let index = 0; index < arrows.length; index++ ) {
  arrows[ index ].addEventListener( "click", () => {
    plusSlides( index, slides );
  } );
}
function plusSlides ( index, slides ) {

  if ( index == 0 ) {
    index = -1;
  }

  slideIndex += index;

  if ( slideIndex > slides.length ) {
    slideIndex = 1;
  }

  if ( slideIndex < 1 ) {
    slideIndex = slides.length;
  }

  showSlides();
}
/* ============================Contra capa=================================== */
let detalhes = document.querySelectorAll( 'body main section#otherWorks ul li button' );
let card = document.querySelectorAll( 'body main section#otherWorks ul li div.card figure' );
let active = [];
for ( let index = 0; index < card.length; index++ ) {
  active[ index ] = 0;

}
for ( let index = 0; index < detalhes.length; index++ ) {
  detalhes[ index ].addEventListener( 'click', () => {

    if ( active[ index ] == 0 ) {
      for ( let i = 0; i < card.length; i++ ) {
        active[ i ] = 0;
        card[ i ].style.transform = "rotateY(0deg)";
      }
      setTimeout( () => {
        card[ index ].style.transform = "rotateY(0deg)";
        active[ index ] = 0;
      }, 60000 );

      active[ index ] = 1;
      card[ index ].style.transform = "rotateY(180deg)";

    } else if ( active[ index ] == 1 ) {
      active[ index ] = 0;
      card[ index ].style.transform = "rotateY(0deg)";
    }
    console.log( active );

  } );

}

/* ======================efeito ima nos card============================== */

let efeitoHover = document.querySelectorAll( 'body main section#otherWorks ul li div.card figure img' );

for ( let index = 0; index < efeitoHover.length; index++ ) {
  // data-tilt data-tilt-reverse="true" data-tilt-scale="1.0" data-tilt-max="3" data-tilt-speed="1000" data-tilt-perspective="300"
  efeitoHover[ index ].setAttribute( 'data-tilt', 'true' );
  efeitoHover[ index ].setAttribute( 'data-tilt-reverse', 'true' );
  efeitoHover[ index ].setAttribute( 'data-tilt-scale', '1' );
  efeitoHover[ index ].setAttribute( 'data-tilt-max', '3' );
  efeitoHover[ index ].setAttribute( 'data-tilt-speed', '1000' );
  efeitoHover[ index ].setAttribute( 'data-tilt-perspective', '300' );

}

/* let time = 3000,
  actualFrame = 0,
  images = document.querySelectorAll( "#slider div" ),
  max = images.length;

function nextImage () {

  images[ actualFrame ].classList.remove( "selected" );

  actualFrame++;

  if ( actualFrame >= max )
    actualFrame = 0;

  images[ actualFrame ].classList.add( "selected" );
}

function start () {
  setInterval( () => {
    // troca de image
    nextImage();
  }, time );
}

window.addEventListener( "load", start ); */
