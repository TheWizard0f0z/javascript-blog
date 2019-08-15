{
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": {
        "plugin:prettier/recommended",
        "eslint:recommended",
    },
    "parserOptions": {
        "ecmaVersion": 2015
    },
    "rules": {
        "prettier/prettier": ["error"]
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single",
            {
                "allowTemplateLiterals": true
            }
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "off"
        ]
    }
}