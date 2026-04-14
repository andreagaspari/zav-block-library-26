import { addFilter } from "@wordpress/hooks";
import { BlockControls } from "@wordpress/block-editor";
import { ToolbarButton } from "@wordpress/components";

// Per modificare attributi
function justifiedParagraphAddAttributes(props) {
    if (props.name === 'core/paragraph') {
        props.attributes = {
            ...props.attributes,
            isJustified: {
                type: 'boolean'
            }
        }
    }
    return props;
}
addFilter('block.registerBlockType', 'core/paragraph', justifiedParagraphAddAttributes)

// Per modificare controlli
const justifiedParagraphControls = (BlockEdit) => (props) => {
    if (props.name === 'core/paragraph') {
        return <>
            <BlockControls>
                <ToolbarButton
                    icon="menu"
                    isPressed = {props.attributes.isJustified}
                    onClick={() => {
                        props.setAttributes({isJustified: !props.attributes.isJustified})
                    }}
                />
            </BlockControls>
            <BlockEdit {...props} />
        </>
    } else {
        return <BlockEdit {...props} />
    }
}
addFilter('editor.BlockEdit', 'imm/justified-paragraph', justifiedParagraphControls);

// Per modificare props lato frontend
function justifiedParagraphAddProps(props, blockType, attributes) {
    if (blockType && blockType.name === 'core/paragraph') {
        const existing = props.className || '';
        return {
            ...props,
            className: existing + (attributes && attributes.isJustified ? ' justified' : ''),
        };
    }
    return props;
}
addFilter('blocks.getSaveContent.extraProps', 'core/paragraph', justifiedParagraphAddProps);

// Per modificare props lato backend
const justifiedParagraphBlockListBlock = (BlockListBlock) => (props) => {
    const { block, wrapperProps = {} } = props;
    const existing = wrapperProps.className || '';
    const isParagraph = block && block.name === 'core/paragraph' && block.attributes && block.attributes.isJustified;
    const className = existing + (isParagraph ? ' justified' : '');

    return <BlockListBlock {...props} wrapperProps={{ ...wrapperProps, className }} />;
};
addFilter('editor.BlockListBlock', 'zav/justified-paragraph', justifiedParagraphBlockListBlock);
