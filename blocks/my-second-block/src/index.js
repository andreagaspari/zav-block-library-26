import { registerBlockType } from "@wordpress/blocks";
import { BlockControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarDropdownMenu } from "@wordpress/components";
import {
  headingLevel1, headingLevel2, headingLevel3,
  headingLevel4, headingLevel5, headingLevel6,
  paragraph, lineSolid
} from "@wordpress/icons"

import block from "../block.json";

registerBlockType(block.name, {
  title: block.title,
  description: block.description,
  attributes: {
    content: {
      type: "string",
      default: "Hello world!"
    },
    tagName: {
      type: "string",
      default: "span"
    }
  },
  edit: (props) => {
    const {
      attributes,
      setAttributes
    } = props;

    const blockProps = useBlockProps();

    return <>

      <BlockControls>
        <ToolbarGroup>
          <ToolbarDropdownMenu
            icon={() => {
              switch(props.attributes.tagName) {
                case "span": return lineSolid
                case "p": return paragraph
                case "h1": return headingLevel1
                case "h2": return headingLevel2
                case "h3": return headingLevel3
                case "h4": return headingLevel4
                case "h5": return headingLevel5
                case "h6": return headingLevel6
              }
            }}
            label="Tag"
            controls = {[
              {
                title: "Span",
                icon: lineSolid,
                onClick: () => setAttributes({ tagName: 'span' }),
                isActive: (attributes.tagName == 'span')
              },
              {
                title: "Paragrafo",
                icon: paragraph,
                onClick: () => setAttributes({ tagName: 'p' }),
                isActive: (attributes.tagName == 'p')
              },
              {
                title: "H1",
                icon: headingLevel1,
                onClick: () => setAttributes({ tagName: 'h1' }),
                isActive: (attributes.tagName == 'h1')
              },
              {
                title: "H2",
                icon: headingLevel2,
                onClick: () => setAttributes({ tagName: 'h2' }),
                isActive: (attributes.tagName == 'h2')
              },
              {
                title: "H3",
                icon: headingLevel3,
                onClick: () => setAttributes({ tagName: 'h3' }),
                isActive: (attributes.tagName == 'h3')
              },
              {
                title: "H4",
                icon: headingLevel4,
                onClick: () => setAttributes({ tagName: 'h4' }),
                isActive: (attributes.tagName == 'h4')
              },
              {
                title: "H5",
                icon: headingLevel5,
                onClick: () => setAttributes({ tagName: 'h5' }),
                isActive: (attributes.tagName == 'h5')
              },
              {
                title: "H6",
                icon: headingLevel6,
                onClick: () => setAttributes({ tagName: 'h6' }),
                isActive: (attributes.tagName == 'h6')
              },
            ]}
          />
        </ToolbarGroup>
      </BlockControls>

      <RichText
        {...blockProps} 
        tagName={attributes.tagName}
        value={attributes.content}
        onChange={(content) => setAttributes({ content })}
      />
    </>;
  },
  save: (props) => {
    const {
      attributes
    } = props;

    const blockProps = useBlockProps.save();
    
    return <RichText.Content 
      {...blockProps} 
      tagName={attributes.tagName} 
      value={attributes.content} 
    />;
  }
});
