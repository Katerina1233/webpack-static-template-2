// ====== ЧТЕНИЕ DOM-ЭЛЕМЕНТОВ ======
const repairBlock = document.querySelector('.repair-block__description');
const repairBlockReadMoreBtn = document.querySelector('.repair-block__read-more-button');
const repairBlockReadMoreText = repairBlockReadMoreBtn?.querySelector('.read-more-button__text');
const repairBlockReadMoreImg = repairBlockReadMoreBtn?.querySelector('.read-more-button__image');

const sideMenu = document.querySelector('.side-menu');
const openMenuBtn = document.querySelector('.button--open-menu');
const closeMenuBtn = document.querySelector('.button--close-menu');

const callbackModal = document.querySelector('.callback');
const callbackCloseBtn = document.querySelector('.button--close-callback');
const callbackOpenBtns = document.querySelectorAll('.button--call');

const feedbackModal = document.querySelector('.feedback');
const feedbackCloseBtn = document.querySelector('.button--close-feedback');
const feedbackOpenBtns = document.querySelectorAll('.button--feedback');

const brandsSliderEl = document.querySelector('.brands__slider');
const technicsSliderEl = document.querySelector('.different-technics__technics-list');
const pricesSliderEl = document.querySelector('.prices__price-list');

const technicsWrapper = document.querySelector('.different-technics__wrapper');
const technicsToggleBtn = document.querySelector('.different-technics__read-more-button');
const technicsToggleText = technicsToggleBtn?.querySelector('.read-more-button__text');
const technicsToggleImg = technicsToggleBtn?.querySelector('.read-more-button__image');

const brandsToggleBtn = document.querySelector('.brands__toggle');
const hiddenBrandCards = document.querySelectorAll('.brands-card--hidden, .brands-card--extra');

let brandsSwiper = null;
let technicsSwiper = null;
let pricesSwiper = null;
let brandsExpanded = false;

// ====== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ======
function toggleModal(modal) {
  if (!modal) return;
  modal.classList.toggle('open');
}

function closeAllModals() {
  feedbackModal?.classList.remove('open');
  callbackModal?.classList.remove('open');
}

function handleOutsideClick(e) {
  // feedback
  if (
    feedbackModal?.classList.contains('open') &&
    !e.target.closest('.feedback') &&
    !e.target.closest('.button--feedback')
  ) {
    feedbackModal.classList.remove('open');
  }

  // callback
  if (
    callbackModal?.classList.contains('open') &&
    !e.target.closest('.callback') &&
    !e.target.closest('.button--call')
  ) {
    callbackModal.classList.remove('open');
  }

  // side-menu
  if (
    sideMenu?.classList.contains('open') &&
    !e.target.closest('.side-menu') &&
    !e.target.closest('.button--open-menu')
  ) {
    sideMenu.classList.remove('open');
  }
}

function checkRepairBlockButtonVisibility() {
  if (!repairBlock || !repairBlockReadMoreBtn) return;
  if (repairBlock.scrollHeight > repairBlock.clientHeight) {
    repairBlockReadMoreBtn.style.display = 'flex';
  } else {
    repairBlockReadMoreBtn.style.display = 'none';
  }
}

function toggleExpandBlock(block, textNode, imgNode, openedText, closedText) {
  if (!block || !textNode || !imgNode) return;
  const isExpanded = block.classList.toggle('expanded');
  imgNode.classList.toggle('expanded', isExpanded);
  textNode.textContent = isExpanded ? closedText : openedText;
}

// ====== SWIPER: ИНИЦИАЛИЗАЦИЯ / УДАЛЕНИЕ ДЛЯ МОБИЛЬНОЙ ВЕРСИИ ======
function initMobileSwipers() {
  const isMobile = window.innerWidth < 768;

  // Бренды
  if (brandsSliderEl) {
    if (isMobile && !brandsSwiper) {
      brandsSwiper = new Swiper('.brands__slider', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 16,
        simulateTouch: true,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.brands__slider .swiper-pagination',
          clickable: true,
        },
      });
    } else if (!isMobile && brandsSwiper) {
      brandsSwiper.destroy(true, true);
      brandsSwiper = null;
    }
  }

  // Типы техники
  if (technicsSliderEl) {
    if (isMobile && !technicsSwiper) {
      technicsSwiper = new Swiper('.different-technics__technics-list', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: '.different-technics__pagination',
          clickable: true,
        },
      });
    } else if (!isMobile && technicsSwiper) {
      technicsSwiper.destroy(true, true);
      technicsSwiper = null;
    }
  }

  // Цены
  if (pricesSliderEl) {
    if (isMobile && !pricesSwiper) {
      pricesSwiper = new Swiper('.prices__price-list', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: '.prices__pagination',
          clickable: true,
        },
      });
    } else if (!isMobile && pricesSwiper) {
      pricesSwiper.destroy(true, true);
      pricesSwiper = null;
    }
  }
}

// ====== ОБРАБОТЧИКИ СОБЫТИЙ ======
window.addEventListener('load', () => {
  checkRepairBlockButtonVisibility();
  initMobileSwipers();
});

window.addEventListener('resize', () => {
  checkRepairBlockButtonVisibility();
  initMobileSwipers();
});

// Читать далее (описание)
if (repairBlockReadMoreBtn) {
  repairBlockReadMoreBtn.addEventListener('click', () => {
    toggleExpandBlock(
      repairBlock,
      repairBlockReadMoreText,
      repairBlockReadMoreImg,
      'Читать далее',
      'Скрыть'
    );
  });
}

// Бургер-меню
if (openMenuBtn && sideMenu) {
  openMenuBtn.addEventListener('click', () => {
    sideMenu.classList.add('open');
  });
}
if (closeMenuBtn && sideMenu) {
  closeMenuBtn.addEventListener('click', () => {
    sideMenu.classList.remove('open');
  });
}

// Модалка "Заказать звонок"
callbackOpenBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    closeAllModals();
    toggleModal(callbackModal);
  });
});
if (callbackCloseBtn) {
  callbackCloseBtn.addEventListener('click', () => toggleModal(callbackModal));
}

// Модалка "Обратная связь"
feedbackOpenBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    closeAllModals();
    toggleModal(feedbackModal);
  });
});
if (feedbackCloseBtn) {
  feedbackCloseBtn.addEventListener('click', () => toggleModal(feedbackModal));
}

// Закрытие по клику вне
document.addEventListener('click', handleOutsideClick);

// Кнопка "Показать все" для брендов (грид)
if (brandsToggleBtn && hiddenBrandCards.length > 0) {
  brandsToggleBtn.addEventListener('click', () => {
    brandsExpanded = !brandsExpanded;

    hiddenBrandCards.forEach((card) => {
      card.style.display = brandsExpanded ? 'flex' : 'none';
    });

    brandsToggleBtn.textContent = brandsExpanded ? 'Скрыть' : 'Показать все';
    brandsToggleBtn.classList.toggle('expanded', brandsExpanded);
  });
}

// Кнопка "Показать все" для типов техники (грид на планшете/десктопе)
if (technicsToggleBtn && technicsWrapper) {
  technicsToggleBtn.addEventListener('click', () => {
    const isExpanded = technicsWrapper.classList.toggle('expanded');
    technicsToggleText.textContent = isExpanded ? 'Скрыть' : 'Показать все';
    technicsToggleImg.classList.toggle('expanded', isExpanded);
  });
}