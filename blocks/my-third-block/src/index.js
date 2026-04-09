import { registerBlockType } from "@wordpress/blocks";
import block from "../block.json";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { TextControl, PanelBody } from "@wordpress/components";

registerBlockType(block.name, {
  title: block.title,
  description: block.description,
  attributes: {
    date_format: {
        type: 'string'
    }
  },
  edit: (props) => {
    const {
        attributes,
        setAttributes
    } = props;

     const blockProps = useBlockProps();

    return (<>
        <InspectorControls
            key="settings"
            group="settings"
            >
            <PanelBody
                title="Formato"
                initialOpen="true"
            >
                <TextControl
                    title="Formato data"
                    help="Lascia vuoto per usare il formato data standard."
                    value={attributes.date_format}
                    onChange={(date_format) => setAttributes({date_format})}
                />
            </PanelBody>
        </InspectorControls>

        <p {...blockProps}>Visualizza data e ora</p>
    </>);
  },
  save: (props) => {
    return <p>Ciao mondo!</p>
  }
})