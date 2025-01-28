import { connect, Field, RenderFieldExtensionCtx, ItemFormSidebarPanelsCtx } from "datocms-plugin-sdk";
import "datocms-react-ui/styles.css";
import ConfigScreen from "./entrypoints/ConfigScreen";

import { render } from "./utils/render";
import { LoremIpsumGenerator } from "./entrypoints/loremIpsumGenerator";
import { Canvas } from "datocms-react-ui";

connect({
	renderConfigScreen(ctx) {
		return render(<div><p>test</p>  <ConfigScreen ctx={ctx} /></div>);
	},
	overrideFieldExtensions(field: Field, ctx: FieldIntentCtx) {
		return {
			addons: [
				{ id: 'loremIpsumGenerator' },
			],
		};
	},
	itemFormSidebarPanels(model: ItemType, ctx: ItemFormSidebarPanelsCtx) {
		return [
			{
				id: 'badSeoRanking',
				label: 'Your website has bad seo setup',
				startOpen: true,
				placement: ["before", "info"],
				rank: 1000,
			},
		];
	},
	renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
		if (ctx.field.attributes.api_key === "seo" && ctx.formValues.seo[ctx.locale].title === "") {
			// alert("IS NULL");
		}
		switch (fieldExtensionId) {
			case 'loremIpsumGenerator':
				return render(<LoremIpsumGenerator ctx={ctx} />);
		}
	},
	renderItemFormSidebarPanel(
		sidebarPanelId: string,
		ctx: any,
	) {
		if (ctx.formValues.seo[ctx.locale].title === "") {
			return render(<Canvas ctx={ctx}>
				<h1>YOUR WEBSITE SEO CAN PERFORM BADLY</h1>
			</Canvas>)
		} else {
			return null
		}



	},

});
