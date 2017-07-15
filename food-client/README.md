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
    - **features/** (logic grouping, should be flat without deep nesting, container components should be here)
      - **Auth/**
        - index.js (exports feature api)
        - reducer.js
        - actions.js
        - constants.js
        - auth.service.js (api calls)
        - **components/** (feature-specific components)
          - PartOfLoginPage.jsx
          - LoginSnippet.jsx
          - LoginPage.jsx
          - index.js (export of public components)
    - **scenes/** (pages or big sections of the app, uses features)
      - **Home**/ (role of the mediator for used features)
        - index.js (component)
        - reducer.js (page state f.e. loading state)
    - **services/**
      - **localStorage**
      - deepFreeze.js
    - index.html
    - index.js
    - Root.jsx