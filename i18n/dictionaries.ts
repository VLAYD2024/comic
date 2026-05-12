export type Locale = 'ru' | 'en' | 'sah';

export const locales: Locale[] = ['ru', 'en', 'sah'];
export const defaultLocale: Locale = 'ru';

export const localeLabels: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  sah: 'Сахалыы'
};

export type Dict = Record<string, string>;

const ru: Dict = {
  'header.catalog': 'Каталог',
  'header.admin': 'Админка',
  'footer.demo': 'Демо · Next.js + Tailwind',

  'catalog.titleStart': 'Сборник',
  'catalog.titleAccent': 'комиксов',
  'catalog.description': 'Выбирай по настроению, листай страницы стрелками, кликом или свайпом.',
  'catalog.empty': 'Пока ни одного комикса.',
  'catalog.addFirst': 'Добавить первый →',
  'catalog.searchPlaceholder': 'Поиск по названию или автору…',
  'catalog.noResults': 'Ничего не нашлось.',
  'card.noCover': 'нет обложки',
  'tags.all': 'Все',

  'comic.back': '← к каталогу',
  'comic.noPages': 'В этом комиксе пока нет страниц.',
  'reader.pageLabel': 'Страница',
  'reader.prev': 'Назад',
  'reader.next': 'Вперёд',
  'reader.prevAria': 'Предыдущая страница',
  'reader.nextAria': 'Следующая страница',

  'admin.title': 'Админка',
  'admin.subtitle': 'Без авторизации. Просто добавляй, редактируй и удаляй.',
  'admin.newComic': '+ Новый комикс',
  'admin.empty': 'Ни одного комикса.',
  'admin.createFirst': 'Создать первый →',
  'admin.open': 'Открыть',
  'admin.edit': 'Править',
  'admin.untitled': '— без названия —',
  'admin.pagesShort': 'стр',
  'admin.tagsShort': 'тегов',
  'admin.backToList': '← к списку',
  'admin.newPageTitle': 'Новый комикс',
  'admin.slugLabel': 'slug:',

  'form.title': 'Название',
  'form.author': 'Автор',
  'form.year': 'Год',
  'form.description': 'Описание',
  'form.tags': 'Теги (через запятую)',
  'form.tagsPlaceholder': 'фэнтези, нуар, для всех',
  'form.cover': 'Обложка',
  'form.imagePlaceholder': 'URL или /uploads/…',
  'form.uploadFile': 'Загрузить файл',
  'form.uploading': 'Загрузка…',
  'form.clear': 'Очистить',
  'form.none': 'нет',
  'form.pages': 'Страницы',
  'form.bulkUpload': 'Загрузить пачкой',
  'form.addEmpty': '+ Пустая',
  'form.noPages': 'Страниц пока нет — добавь через «Загрузить пачкой» или вручную.',
  'form.pageUrl': 'URL картинки или /uploads/…',
  'form.pageCaption': 'Подпись (необязательно)',
  'form.empty': 'пусто',
  'form.moveUp': 'Выше',
  'form.moveDown': 'Ниже',
  'form.deletePage': 'Удалить',
  'form.saving': 'Сохраняю…',
  'form.create': 'Создать',
  'form.save': 'Сохранить',
  'form.delete': 'Удалить',
  'form.cancel': 'Отмена',
  'form.confirmDelete': 'Удалить «{title}»?',
  'form.deleteFailed': 'Не удалось удалить',
  'form.errorGeneric': 'Ошибка'
};

const en: Dict = {
  'header.catalog': 'Catalog',
  'header.admin': 'Admin',
  'footer.demo': 'Demo · Next.js + Tailwind',

  'catalog.titleStart': 'Comic',
  'catalog.titleAccent': 'collection',
  'catalog.description': 'Pick by mood, flip pages with arrows, clicks or swipes.',
  'catalog.empty': 'No comics yet.',
  'catalog.addFirst': 'Add the first one →',
  'catalog.searchPlaceholder': 'Search by title or author…',
  'catalog.noResults': 'Nothing found.',
  'card.noCover': 'no cover',
  'tags.all': 'All',

  'comic.back': '← back to catalog',
  'comic.noPages': 'This comic has no pages yet.',
  'reader.pageLabel': 'Page',
  'reader.prev': 'Back',
  'reader.next': 'Forward',
  'reader.prevAria': 'Previous page',
  'reader.nextAria': 'Next page',

  'admin.title': 'Admin',
  'admin.subtitle': 'No auth. Just add, edit and delete.',
  'admin.newComic': '+ New comic',
  'admin.empty': 'No comics yet.',
  'admin.createFirst': 'Create the first one →',
  'admin.open': 'Open',
  'admin.edit': 'Edit',
  'admin.untitled': '— untitled —',
  'admin.pagesShort': 'p',
  'admin.tagsShort': 'tags',
  'admin.backToList': '← back to list',
  'admin.newPageTitle': 'New comic',
  'admin.slugLabel': 'slug:',

  'form.title': 'Title',
  'form.author': 'Author',
  'form.year': 'Year',
  'form.description': 'Description',
  'form.tags': 'Tags (comma separated)',
  'form.tagsPlaceholder': 'fantasy, noir, for everyone',
  'form.cover': 'Cover',
  'form.imagePlaceholder': 'URL or /uploads/…',
  'form.uploadFile': 'Upload file',
  'form.uploading': 'Uploading…',
  'form.clear': 'Clear',
  'form.none': 'none',
  'form.pages': 'Pages',
  'form.bulkUpload': 'Bulk upload',
  'form.addEmpty': '+ Empty',
  'form.noPages': 'No pages yet — use «Bulk upload» or add manually.',
  'form.pageUrl': 'Image URL or /uploads/…',
  'form.pageCaption': 'Caption (optional)',
  'form.empty': 'empty',
  'form.moveUp': 'Move up',
  'form.moveDown': 'Move down',
  'form.deletePage': 'Delete',
  'form.saving': 'Saving…',
  'form.create': 'Create',
  'form.save': 'Save',
  'form.delete': 'Delete',
  'form.cancel': 'Cancel',
  'form.confirmDelete': 'Delete «{title}»?',
  'form.deleteFailed': 'Failed to delete',
  'form.errorGeneric': 'Error'
};

const sah: Dict = {
  'header.catalog': 'Каталог',
  'header.admin': 'Салайыы',
  'footer.demo': 'Дьэмо · Next.js + Tailwind',

  'catalog.titleStart': 'Комикс',
  'catalog.titleAccent': 'хомуурунньуга',
  'catalog.description':
    'Санааҕынан талан, сирэйдэри стрелканан, чыпчылыйыынан эбэтэр свайпынан көрдөр.',
  'catalog.empty': 'Билигин туох да комикс суох.',
  'catalog.addFirst': 'Бастакыны эбэр →',
  'catalog.searchPlaceholder': 'Аатынан эбэтэр суруйааччынан көрдөө…',
  'catalog.noResults': 'Туох да көстүбэтэ.',
  'card.noCover': 'тас сирэйэ суох',
  'tags.all': 'Барыта',

  'comic.back': '← каталокка төннүү',
  'comic.noPages': 'Бу комикска билигин сирэй суох.',
  'reader.pageLabel': 'Сирэй',
  'reader.prev': 'Хаалыыга',
  'reader.next': 'Иннигэр',
  'reader.prevAria': 'Иннинээҕи сирэй',
  'reader.nextAria': 'Кэлэр сирэй',

  'admin.title': 'Салайыы',
  'admin.subtitle': 'Авторизацията суох. Эбэн, уларытан уонна сот.',
  'admin.newComic': '+ Саҥа комикс',
  'admin.empty': 'Туох да комикс суох.',
  'admin.createFirst': 'Бастакыны тэрий →',
  'admin.open': 'Аhан',
  'admin.edit': 'Уларытыы',
  'admin.untitled': '— аата суох —',
  'admin.pagesShort': 'сир',
  'admin.tagsShort': 'тэг',
  'admin.backToList': '← испииhэккэ',
  'admin.newPageTitle': 'Саҥа комикс',
  'admin.slugLabel': 'slug:',

  'form.title': 'Аата',
  'form.author': 'Суруйааччы',
  'form.year': 'Сыл',
  'form.description': 'Биллиригэ',
  'form.tags': 'Тэгтэр (запятайынан)',
  'form.tagsPlaceholder': 'фантастика, нуар, бары инчигэ',
  'form.cover': 'Тас сирэйэ',
  'form.imagePlaceholder': 'URL эбэтэр /uploads/…',
  'form.uploadFile': 'Файлы үрдэт',
  'form.uploading': 'Үрдэтии…',
  'form.clear': 'Сот',
  'form.none': 'суох',
  'form.pages': 'Сирэйдэр',
  'form.bulkUpload': 'Хомуурунан үрдэт',
  'form.addEmpty': '+ Куруу',
  'form.noPages': 'Сирэй суох — «Хомуурунан үрдэт» эбэтэр илиигинэн эбэр.',
  'form.pageUrl': 'Ойуу URL эбэтэр /uploads/…',
  'form.pageCaption': 'Бэлиэтэ (баар буолбатах)',
  'form.empty': 'суох',
  'form.moveUp': 'Үөhэ',
  'form.moveDown': 'Аллара',
  'form.deletePage': 'Сот',
  'form.saving': 'Кэбиhэбин…',
  'form.create': 'Тэрий',
  'form.save': 'Хадьар',
  'form.delete': 'Сот',
  'form.cancel': 'Тохтот',
  'form.confirmDelete': '«{title}» — сотуоххун баҕарар буолуоҥ?',
  'form.deleteFailed': 'Сотуу табыллыбата',
  'form.errorGeneric': 'Алдьархай'
};

export const dictionaries: Record<Locale, Dict> = { ru, en, sah };

export function translate(
  dict: Dict,
  key: string,
  params?: Record<string, string | number>
): string {
  let s = dict[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      s = s.replaceAll(`{${k}}`, String(v));
    }
  }
  return s;
}
