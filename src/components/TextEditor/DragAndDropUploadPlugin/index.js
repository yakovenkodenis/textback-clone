import handleDroppedFiles from './handleDroppedFiles';

const createDnDFileUploadPlugin = (config = {}) => ({
    handleDroppedFiles: handleDroppedFiles(config)
});

export default createDnDFileUploadPlugin;
