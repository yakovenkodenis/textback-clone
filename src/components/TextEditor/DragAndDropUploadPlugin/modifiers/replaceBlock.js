import { Modifier, EditorState, SelectionState } from 'draft-js';


export default (editorState, blockKey, newType) => {
    let content = editorState.getCurrentContent();

    const targetRange = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: 1
    });

    content = Modifier.setBlockType(
        content,
        targetRange,
        newType
    );
    
    const newState = EditorState.push(editorState, content, 'modify-block');
    return EditorState.forceSelection(newState, editorState.getSelection());
}
