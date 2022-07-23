module.exports = class StringCleaner {
    cleanRoleName = (roleName, rolePrefix) => {
        return roleName.toLowerCase().replace(rolePrefix, "");
    }

    toTitleCase = (text) => {
        text = text.toLowerCase()
            .split(' ')
            .map((s) => {
                if (/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(s)) {
                    return s.toUpperCase();
                }
                else {
                    return s.charAt(0).toUpperCase() + s.substring(1);
                }
            })
            .join(' ');
        return text;
    }

    removeMentions = (text) => {
        return text.replace(new RegExp(/<(@!|@)\d+>/g), "");
    }
}
