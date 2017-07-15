module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
        "browser": true,
        "node": true,
        "jest": true
    },
    "rules": {
        "linebreak-style": "off",
        "no-plusplus": "off",
        "no-param-reassign": "off",
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/require-default-props": "off",
        "no-trailing-spaces": ["error", { "skipBlankLines": true }]
    },
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "./config/webpack.common.config.js"
            }
        }
    }
};