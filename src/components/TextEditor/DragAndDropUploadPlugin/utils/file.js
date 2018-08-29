
export const containsFiles = e => {
    if (e.dataTransfer.types) {
        for (let i = 0; i < e.dataTransfer.types.length; ++i) {
            if (e.dataTransfer.types[i] === 'Files') {
                return true;
            }
        }
    }

    return false;
}

export const readFile = file =>
    new Promise(resolve => {
        const reader = new FileReader();

        reader.onload = e => {
            resolve({
                lastModifiedDate: file.lastModifiedDate,
                lastModified: file.lastModified,
                name: file.name,
                size: file.size,
                type: file.type,

                src: e.target.result
            });
        };

        if (file.type.indexOf('text/') === 0 || file.type === 'application/json') {
            reader.readAsText(file);
        } else if (file.type.indexOf('image/') === 0) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsBinaryString(file);
        }
    });

export const readFiles = files => Promise.all(files.map(readFile));
