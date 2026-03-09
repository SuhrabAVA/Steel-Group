const stories = [
  {
    title: 'Сварка',
    image: 'https://metallsnab.kz/wp-content/uploads/2017/11/rezka3.jpg',
    caption: 'Аргонная сварка металлоконструкций для промышленного объекта.'
  },
  {
    title: 'Резка',
    image: 'https://metallsnab.kz/wp-content/uploads/2017/11/rezka3.jpg',
    caption: 'Точная резка листового металла и подготовка деталей к сборке.'
  },
  {
    title: 'Цех',
    image: 'https://metallsnab.kz/wp-content/uploads/2017/11/rezka3.jpg',
    caption: 'Производственный цех с готовыми заготовками и деталями.'
  },
  {
    title: 'Покраска',
    image: 'https://metallsnab.kz/wp-content/uploads/2017/11/rezka3.jpg',
    caption: 'Этап порошковой покраски и финишной обработки изделий.'
  },
  {
    title: 'Гибка',
    image: 'https://metallsnab.kz/wp-content/uploads/2017/11/rezka3.jpg',
    caption: 'Гибка металла по техническим размерам и проектным чертежам.'
  }
];

const modal = document.getElementById('storyModal');
const modalImage = document.getElementById('storyImage');
const modalMeta = document.getElementById('storyMeta');
const modalCaption = document.getElementById('storyCaption');
const progressRoot = document.getElementById('storyProgress');
const closeBtn = document.getElementById('storyClose');
const prevBtn = document.getElementById('storyPrev');
const nextBtn = document.getElementById('storyNext');
const storyButtons = document.querySelectorAll('.story');

let currentStory = 0;
let timer = null;
let startTime = null;
const storyDuration = 3500;

function buildProgress() {
  progressRoot.innerHTML = '';
  stories.forEach(() => {
    const bar = document.createElement('div');
    bar.className = 'story-progress__bar';
    const fill = document.createElement('span');
    bar.appendChild(fill);
    progressRoot.appendChild(bar);
  });
}

function updateProgress(progress = 0) {
  const fills = progressRoot.querySelectorAll('span');
  fills.forEach((fill, index) => {
    if (index < currentStory) fill.style.width = '100%';
    else if (index > currentStory) fill.style.width = '0%';
    else fill.style.width = `${progress}%`;
  });
}

function renderStory(index) {
  currentStory = (index + stories.length) % stories.length;
  const story = stories[currentStory];
  modalImage.src = story.image;
  modalImage.alt = story.title;
  modalMeta.textContent = story.title;
  modalCaption.textContent = story.caption;
  startAutoplay();
}

function animateFrame(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  const progress = Math.min((elapsed / storyDuration) * 100, 100);
  updateProgress(progress);

  if (elapsed >= storyDuration) {
    renderStory(currentStory + 1);
    return;
  }

  timer = requestAnimationFrame(animateFrame);
}

function startAutoplay() {
  cancelAnimationFrame(timer);
  startTime = null;
  updateProgress(0);
  timer = requestAnimationFrame(animateFrame);
}

function openStory(index) {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (!progressRoot.children.length) buildProgress();
  renderStory(index);
}

function closeStory() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  cancelAnimationFrame(timer);
}

storyButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => openStory(index));
});

closeBtn?.addEventListener('click', closeStory);
modal?.querySelector('.story-modal__overlay')?.addEventListener('click', closeStory);
prevBtn?.addEventListener('click', () => renderStory(currentStory - 1));
nextBtn?.addEventListener('click', () => renderStory(currentStory + 1));

document.addEventListener('keydown', (event) => {
  if (!modal.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeStory();
  if (event.key === 'ArrowRight') renderStory(currentStory + 1);
  if (event.key === 'ArrowLeft') renderStory(currentStory - 1);
});


const commentToggleButtons = document.querySelectorAll('.js-comment-toggle');

commentToggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.commentTarget;
    if (!targetId) return;

    const commentsBlock = document.getElementById(targetId);
    if (!commentsBlock) return;

    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isExpanded));
    commentsBlock.hidden = isExpanded;
  });
});

const carouselRoot = document.querySelector('[data-carousel-root]');
const carouselTrack = carouselRoot?.querySelector('.js-post-carousel');
const carouselDotsRoot = document.querySelector('[data-carousel-dots]');

let carouselIndex = 0;

function setCarouselIndex(index) {
  if (!carouselTrack) return;
  const slides = carouselTrack.querySelectorAll('img');
  const maxIndex = Math.max(0, slides.length - 1);
  carouselIndex = Math.max(0, Math.min(index, maxIndex));
  carouselTrack.scrollTo({
    left: carouselTrack.clientWidth * carouselIndex,
    behavior: 'smooth'
  });
  const dots = carouselDotsRoot?.querySelectorAll('.media-dots__dot') || [];
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('media-dots__dot--active', dotIndex === carouselIndex);
  });
}

function buildCarouselDots() {
  if (!carouselTrack || !carouselDotsRoot) return;
  const slides = carouselTrack.querySelectorAll('img');
  carouselDotsRoot.innerHTML = '';

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'media-dots__dot';
    dot.setAttribute('aria-label', `Изображение ${index + 1}`);
    dot.addEventListener('click', () => setCarouselIndex(index));
    carouselDotsRoot.appendChild(dot);
  });

  setCarouselIndex(0);
}

carouselTrack?.addEventListener('scroll', () => {
  const slideWidth = carouselTrack.clientWidth || 1;
  const nextIndex = Math.round(carouselTrack.scrollLeft / slideWidth);
  if (nextIndex === carouselIndex) return;
  carouselIndex = nextIndex;
  const dots = carouselDotsRoot?.querySelectorAll('.media-dots__dot') || [];
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('media-dots__dot--active', dotIndex === carouselIndex);
  });
});

buildCarouselDots();
