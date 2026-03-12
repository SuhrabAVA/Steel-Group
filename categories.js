const categoryCards = document.querySelectorAll('.category-card');
const galleryModal = document.getElementById('categoryGallery');
const galleryMasonry = document.getElementById('galleryMasonry');
const galleryTitle = document.getElementById('galleryTitle');
const galleryCloseButtons = document.querySelectorAll('[data-gallery-close]');

const previewModal = document.getElementById('categoryPreview');
const previewImage = document.getElementById('previewImage');
const previewTitle = document.getElementById('previewTitle');
const previewMeta = document.getElementById('previewMeta');
const previewDescription = document.getElementById('previewDescription');
const previewTags = document.getElementById('previewTags');
const previewLikes = document.getElementById('previewLikes');
const previewCloseButtons = document.querySelectorAll('[data-preview-close]');

let activeCategory = null;

const galleryByCategory = {
  welding: {
    title: 'Сварка — работы',
    photos: [
      { title: 'Сварной узел фермы', likes: 412, image: 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Точечная сварка', likes: 276, image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Шов из нержавейки', likes: 338, image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Монтаж каркаса', likes: 504, image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Сварка лестничного марша', likes: 367, image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Усиление несущего узла', likes: 289, image: 'https://images.unsplash.com/photo-1521790361543-f645cf042ec4?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Стыковка балок', likes: 431, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80', height: 'tall' }
    ]
  },
  cutting: {
    title: 'Резка — работы',
    photos: [
      { title: 'Плазменная резка деталей #2', likes: 363, image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Листы после ЧПУ', likes: 228, image: 'https://images.unsplash.com/photo-1565791380707-1756b9a2f7f6?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Точная нарезка', likes: 487, image: 'https://images.unsplash.com/photo-1565061828011-58c8b9ba4f69?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Готовые контуры', likes: 312, image: 'https://images.unsplash.com/photo-1582719478185-2196ac9f8bbf?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Комплект заготовок', likes: 276, image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Линия плазменной резки', likes: 401, image: 'https://images.unsplash.com/photo-1565061828011-58c8b9ba4f69?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Чистый рез без заусенцев', likes: 238, image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80', height: 'medium' }
    ]
  },
  bending: {
    title: 'Гибка — работы',
    photos: [
      { title: 'Гибка профиля', likes: 251, image: 'https://images.unsplash.com/photo-1581092160607-ee22731d8af8?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Сложный угол', likes: 319, image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Партия заготовок', likes: 402, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Проверка геометрии', likes: 198, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Гибка швеллера', likes: 257, image: 'https://images.unsplash.com/photo-1581092919535-7146ff1a590b?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Пресс-операция серии', likes: 374, image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Радиусный профиль', likes: 216, image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=900&q=80', height: 'medium' }
    ]
  },
  painting: {
    title: 'Покраска — работы',
    photos: [
      { title: 'Порошковая камера', likes: 295, image: 'https://images.unsplash.com/photo-1592454428210-3e0d60149689?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Цвет по RAL', likes: 211, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Финишное покрытие', likes: 340, image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Сушка изделий', likes: 183, image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Покраска фасадных панелей', likes: 264, image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Линия полимеризации', likes: 397, image: 'https://images.unsplash.com/photo-1592454428210-3e0d60149689?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Финишный контроль оттенка', likes: 229, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80', height: 'medium' }
    ]
  },
  construction: {
    title: 'Корзины для кондиционеров — работы',
    photos: [
      { title: 'Каркас корзины', likes: 384, image: 'https://images.unsplash.com/photo-1565791380707-1756b9a2f7f6?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Порошковая окраска', likes: 227, image: 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Монтаж фасадного блока', likes: 315, image: 'https://images.unsplash.com/photo-1521790361543-f645cf042ec4?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Секция на объекте', likes: 266, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Блок из 20 корзин', likes: 432, image: 'https://images.unsplash.com/photo-1565791380707-1756b9a2f7f6?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Ребра жесткости', likes: 203, image: 'https://images.unsplash.com/photo-1521790361543-f645cf042ec4?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Антикоррозийная обработка', likes: 274, image: 'https://images.unsplash.com/photo-1473447198193-98c8f9dbaa8e?auto=format&fit=crop&w=900&q=80', height: 'short' }
    ]
  },
  doors: {
    title: 'Металлические двери — работы',
    photos: [
      { title: 'Входная дверь', likes: 207, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Сейфовая рама', likes: 271, image: 'https://images.unsplash.com/photo-1464107687427-40aa6f7a90f5?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Порошковая эмаль', likes: 180, image: 'https://images.unsplash.com/photo-1565791380707-1756b9a2f7f6?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Фурнитура и замки', likes: 324, image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Порошковое покрытие двери', likes: 233, image: 'https://images.unsplash.com/photo-1565791380707-1756b9a2f7f6?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Монтаж дверного блока', likes: 379, image: 'https://images.unsplash.com/photo-1464107687427-40aa6f7a90f5?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Теплоизоляционный контур', likes: 261, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80', height: 'medium' }
    ]
  },
  brackets: {
    title: 'Кронштейны — работы',
    photos: [
      { title: 'Парные кронштейны', likes: 164, image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Усиленный узел', likes: 286, image: 'https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Серийное производство', likes: 311, image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Контроль качества', likes: 192, image: 'https://images.unsplash.com/photo-1582719478185-2196ac9f8bbf?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Оцинкованные кронштейны', likes: 219, image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Узел крепления фасада', likes: 342, image: 'https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Комплект монтажных пластин', likes: 201, image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=900&q=80', height: 'medium' }
    ]
  },
  custom: {
    title: 'Индивидуальные заказы',
    photos: [
      { title: 'Изделие по чертежу', likes: 453, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Нестандартный проект', likes: 369, image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Примерка на объекте', likes: 244, image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Готовое решение', likes: 507, image: 'https://images.unsplash.com/photo-1473447198193-98c8f9dbaa8e?auto=format&fit=crop&w=900&q=80', height: 'medium' },
      { title: 'Архитектурный элемент', likes: 338, image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80', height: 'short' },
      { title: 'Сборка по индивидуальному ТЗ', likes: 426, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80', height: 'tall' },
      { title: 'Проверка перед сдачей', likes: 288, image: 'https://images.unsplash.com/photo-1582719478185-2196ac9f8bbf?auto=format&fit=crop&w=900&q=80', height: 'medium' }
    ]
  }
};

function makeDescription(photoTitle, categoryTitle) {
  return `Подробное описание проекта «${photoTitle}». Работы выполнены в категории «${categoryTitle}» с соблюдением стандартов качества и сроков.`;
}

function renderGallery(categoryKey) {
  const payload = galleryByCategory[categoryKey];
  if (!payload || !galleryMasonry || !galleryTitle) return;

  activeCategory = categoryKey;
  galleryTitle.textContent = payload.title;
  galleryMasonry.innerHTML = '';

  payload.photos.forEach((photo, index) => {
    const item = document.createElement('article');
    item.className = `gallery-item gallery-item--${photo.height || 'medium'}`;
    item.dataset.index = String(index);

    item.innerHTML = `
      <img src="${photo.image}" alt="${photo.title}" loading="lazy" />
      <div class="gallery-item__shade"></div>
      <div class="gallery-item__meta">
        <h3>${photo.title}</h3>
        <span>❤ ${photo.likes}</span>
      </div>
    `;

    galleryMasonry.appendChild(item);
  });
}

function openPreview(photo) {
  const payload = galleryByCategory[activeCategory];
  if (!photo || !payload || !previewModal) return;

  previewImage.src = photo.image;
  previewImage.alt = photo.title;
  previewTitle.textContent = photo.title;
  previewMeta.textContent = `SteelGroup • ${payload.title.replace(' — работы', '')}`;
  previewDescription.textContent = makeDescription(photo.title, payload.title);
  previewLikes.textContent = String(photo.likes);

  previewTags.innerHTML = '';
  ['#steelgroup', '#metalwork', '#резка', '#industrial'].forEach((tag) => {
    const chip = document.createElement('span');
    chip.textContent = tag;
    previewTags.appendChild(chip);
  });

  previewModal.classList.add('is-open');
  previewModal.setAttribute('aria-hidden', 'false');
}

function closePreview() {
  previewModal?.classList.remove('is-open');
  previewModal?.setAttribute('aria-hidden', 'true');
}

function openGallery(categoryKey) {
  closePreview();
  renderGallery(categoryKey);
  galleryModal?.classList.add('is-open');
  galleryModal?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  closePreview();
  galleryModal?.classList.remove('is-open');
  galleryModal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

categoryCards.forEach((card) => {
  card.addEventListener('click', () => {
    openGallery(card.dataset.category);
  });
});

galleryMasonry?.addEventListener('click', (event) => {
  const item = event.target.closest('.gallery-item');
  if (!item || !activeCategory) return;

  const photoIndex = Number(item.dataset.index);
  const photo = galleryByCategory[activeCategory]?.photos?.[photoIndex];
  openPreview(photo);
});

galleryCloseButtons.forEach((button) => {
  button.addEventListener('click', closeGallery);
});

previewCloseButtons.forEach((button) => {
  button.addEventListener('click', closePreview);
});

document.addEventListener('keydown', (event) => {
  if (!galleryModal?.classList.contains('is-open')) return;

  if (event.key === 'Escape') {
    if (previewModal?.classList.contains('is-open')) {
      closePreview();
      return;
    }

    closeGallery();
  }
});
