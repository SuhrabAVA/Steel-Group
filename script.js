const stories = [
  {
    title: 'Сварка',
    image: 'assets/post1.png',
    caption: 'Аргонная сварка металлоконструкций для промышленного объекта.'
  },
  {
    title: 'Резка',
    image: 'assets/post2.png',
    caption: 'Точная резка листового металла и подготовка деталей к сборке.'
  },
  {
    title: 'Цех',
    image: 'assets/story3.png',
    caption: 'Производственный цех с готовыми заготовками и деталями.'
  },
  {
    title: 'Покраска',
    image: 'assets/story4.png',
    caption: 'Этап порошковой покраски и финишной обработки изделий.'
  },
  {
    title: 'Гибка',
    image: 'assets/story5.png',
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
