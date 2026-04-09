import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import block from "../block.json";

registerBlockType(block.name, {
  title: block.title,
  description: block.description,
  attributes: {
  },
  edit: (props) => {
    const {
        attributes,
        setAttributes
    } = props;
    const blockProps = useBlockProps();
    
    return <div {...blockProps}>
        <InnerBlocks 
            orientation="horizontal"
        />
    </div>;
  },
  save: (props) => {
    const blockProps = useBlockProps.save();

    return <div {...blockProps}>
        <InnerBlocks.Content />
    </div>;
  }
});