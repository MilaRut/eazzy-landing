# Папка для отимизированных изображений

```shell
└── source/
    └── images/
        ├── hero@1x.png
        ├── hero@1x.webp
        ├── hero@2x.png
        ├── hero@2x.webp
        └── logo.svg
```

Отсюда файлы изображений при продакшен-сборке без изменений попадают в `build/images/`:

```shell
└── build/
    └── images/
        ├── hero@1x.png
        ├── hero@1x.webp
        ├── hero@2x.png
        ├── hero@2x.webp
        └── logo.svg
```

При дев-сборке изображения не копируются в `build/images/`, сервер их забирает из `source/images/`

## Пример подключения изображения

В стилевом файле БЭМ-блока пути должны быть валидными для исходников (как подсказывает редактор):

```scss
.hero {
  background-image: image-set(
    url("../../images/hero@1x.webp") 1x type("image/webp"),
    url("../../images/hero@2x.webp") 2x type("image/webp"),
    url("../../images/hero@1x.png") 1x type("image/png"),
    url("../../images/hero@2x.png") 2x type("image/png")
  );
}
```

Сборка сама исправит эти пути на валидные для билда:

```css
.hero {
  background-image: image-set(
    url("../images/hero@1x.webp") 1x type("image/webp"),
    url("../images/hero@2x.webp") 2x type("image/webp"),
    url("../images/hero@1x.png") 1x type("image/png"),
    url("../images/hero@2x.png") 2x type("image/png")
  );
}
```
