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
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
    },
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "./config/webpack.common.config.js"
            }
        }
    }
};