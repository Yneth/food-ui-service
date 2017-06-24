# Folder structure
### Description
  Folder structure is flat and feature based. Each feature contains it`s own logic and related components. Feature can have multiple exported components. Features not necessarily should be domain-driven (it can be just some page or other component organism).
### Example
  - **config/** (contains configuration files: .eslintrc, webpack.config, ...)
  - **src/**
    - **ui-library/** (atomic react presentational components and base project styles)
      - Button
      - Label
      - Title
    - **components/** (app specific presentational components)
      - ItemsTape
      - SearchBox
      - SuggestionsInput
    - **features/** (should be flat without deep nesting, container components should be here)
      - **Auth/**
        - index.js (exports feature api)
        - reducer.js
        - actions.js
        - constants.js
        - auth.service.js (api calls)
        - **components/** (private feature-specific components)
          - PartOfLoginPage.jsx
        - **views/** (exported container components of feature)
          - LoginSnippet.jsx
          - LoginPage.jsx
    - **services/**
      - **localStorage**
      - deepFreeze.js
    - index.html
    - index.js
    - Root.jsx