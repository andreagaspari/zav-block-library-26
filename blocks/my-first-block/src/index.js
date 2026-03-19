import { registerBlockType } from "@wordpress/blocks";
import { BlockControls, InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup, ToolbarDropdownMenu, PanelBody, SelectControl, TextControl } from "@wordpress/components";
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
    fontWeight: {
      type: "string",
      default: "normal"
    },
    isItalic: {
      type: "boolean",
      default: false
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

    const blockProps = useBlockProps({
      className: 
        ((attributes.isItalic) ? 'is-italic ' : '') + 
        ((attributes.fontWeight == 'bold') ? 'is-bold ' : '')
    });

    let TagName =attributes.tagName;
    
    return <>
      <InspectorControls
        key="settings"
        group="settings"
      >
        <PanelBody
          title="Contenuto"
          initialOpen="true"
        >
          <TextControl
            title="Contenuto"
            value={attributes.content}
            onChange={(content) => setAttributes({content})}
          />
        </PanelBody>
      </InspectorControls>

      <InspectorControls
        key="styles"
        group="styles"
      >
        <PanelBody
          title="Tipografia"
          initialOpen="true"
        >
          <SelectControl
            label="Peso del font"
            value={attributes.fontWeight}
            options={[
              {label: "Normale", value: "normal"},
              {label: "Grassetto", value: "bold"}
            ]}
            onChange={(newValue) => {setAttributes({fontWeight: newValue})}}
          />
        </PanelBody>
      </InspectorControls>

      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M14.7 11.3c1-.6 1.5-1.6 1.5-3 0-2.3-1.3-3.4-4-3.4H7v14h5.8c1.4 0 2.5-.3 3.3-1 .8-.7 1.2-1.7 1.2-2.9.1-1.9-.8-3.1-2.6-3.7zm-5.1-4h2.3c.6 0 1.1.1 1.4.4.3.3.5.7.5 1.2s-.2 1-.5 1.2c-.3.3-.8.4-1.4.4H9.6V7.3zm4.6 9c-.4.3-1 .4-1.7.4H9.6v-3.9h2.9c.7 0 1.3.2 1.7.5.4.3.6.8.6 1.5s-.2 1.2-.6 1.5z"></path></svg>
            }
            isPressed = {(attributes.fontWeight == 'bold')}
            onClick={() => {
              setAttributes({fontWeight: (attributes.fontWeight == 'normal') ? "bold" : "normal"})
            }}
            />
          <ToolbarButton
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M12.5 5L10 19h1.9l2.5-14z"></path></svg>
            }
            isPressed = { attributes.isItalic }
            onClick={() => {
              setAttributes({ isItalic: !attributes.isItalic })
            }}
          />
        </ToolbarGroup>
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
              isActive: (attributes.tagName == 'span')
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
      </BlockControls>

      <TagName {...blockProps} >
        {attributes.content}
      </TagName>

      <RichText
      />
    
    </>;
  },
  save: (props) => {
    const {
      attributes
    } = props;

    const blockProps = useBlockProps.save({
      className: 
        ((attributes.isItalic) ? 'is-italic ' : '') + 
        ((attributes.fontWeight == 'bold') ? 'is-bold ' : '')
    });

    let TagName = attributes.tagName ?? 'span'
    
    return <TagName {...blockProps} >
      {attributes.content}
    </TagName>;
  },
});
