import { EditorState } from 'draft-js';

// import replaceBlock from './modifiers/replaceBlock';
// import modifyBlockData from './modifiers/modifyBlockData';
import { readFiles } from './utils/file';
// import { getBlocksWhereEntityData } from './utils/block';


// const defaultHandleBlock = (state, selection, data, defaultBlockType) =>
//     addBlock(state, selection, defaultBlockType, data);

export default function onDropFile(config) {
    return function onDropFileInner(selection, files, { getEditorState, setEditorState }) {

        const {
            handleUpload
        } = config;

        if (handleUpload) {
            const formData = new FormData();

            const data = {
                files: [],
                formData
            };

            for (let key in files) {
                if (files[key] && files[key] instanceof File) {
                    data.formData.append('files', files[key]);
                    data.files.push(files[key]);
                }
            }


            setEditorState(EditorState.acceptSelection(getEditorState(), selection));

            readFiles(data.files).then(placeholders => {
                let editorState = getEditorState();
                
                placeholders.forEach(placeholder => {
                    editorState = config.addImage(editorState, placeholder.src);
                });

                setEditorState(editorState);

                // handleUpload(data, (uploadedFiles, { retainSrc }) => {
                //     let newEditorState = getEditorState();

                //     uploadedFiles.forEach(file => {
                //         const blocks = getBlocksWhereEntityData(
                //             state,
                //             block => block.src === file.src && block.progress !== undefined);

                //         if (blocks.size) {
                //             const newEditorStateOrBlockType = handleBlock
                //                 ? handleBlock(newEditorState, newEditorState.getSelection(), file)
                //                 : defaultBlockType;

                //             newEditorState = replaceBlock(
                //                 modifyBlockData(
                //                     newEditorState,
                //                     blocks.first().get('key'),
                //                     retainSrc ? { progress: undefined } : { progress: undefined, src: undefined }
                //                 ),
                //                 blocks.first().get('key'),
                //                 newEditorStateOrBlockType
                //             );
                //         } else {
                //             const newEditorStateOrBlockType = handleBlock
                //             ? handleBlock(newEditorState, newEditorState.getSelection(), file)
                //             : defaultHandleBlock(newEditorState, newEditorState.getSelection(), file), defaultBlockType;

                //             if (!newEditorStateOrBlockType) {
                //                 newEditorState = defaultHandleBlock(newEditorState, selection, file, defaultBlockType);
                //             } else if (typeof newEditorStateOrBlockType === 'string') {
                //                 newEditorState = defaultHandleBlock(newEditorState, selection, file, newEditorStateOrBlockType);
                //             } else {
                //                 newEditorState = newEditorStateOrBlockType;
                //             }
                //         }
                        
                //     });


                //     if (handleProgress) handleProgress(null);

                //     setEditorState(newEditorState);
                // }, () => {
                //     console.error(err);
                // }, percent => {
                //     let newEditorState = getEditorState();

                //     placeholders.forEach(placeholder => {
                //         const blocks = getBlocksWhereEntityData(
                //             newEditorState,
                //             p => p.src === placeholder.src && p.progress !== undefined
                //         );

                //         if (blocks.size) {
                //             newEditorState = modifyBlockData(
                //                 newEditorState,
                //                 blocks.first().get('key'),
                //                 { progress: percent }
                //             );
                //         }
                //     });

                //     setEditorState(newEditorState);

                //     if (handleProgress) {
                //         handleProgress(percent);
                //     }
                // });
            });

            return 'handled';
        }

        return undefined;
    }
}

