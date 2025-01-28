import { connect, ItemFormSidebarPanelsCtx, RenderItemFormSidebarPanelCtx, ItemType } from "datocms-plugin-sdk";
import "datocms-react-ui/styles.css";
import ConfigScreen from "./entrypoints/ConfigScreen";
import { render } from "./utils/render";
import { SeoChecker } from "./entrypoints/SeoChecker";
import { SeoFieldProperties } from "./interfaces/Seo";




connect({
	renderConfigScreen(ctx) {
		return render(<ConfigScreen ctx={ctx} />);
	},
	itemFormSidebarPanels(_model: ItemType, ctx: ItemFormSidebarPanelsCtx) {
		const { seoChecker } = ctx.plugin.attributes.parameters;
		if (!seoChecker) {
			return [];
		}
		return [{
			id: 'badSeoRanking',
			label: 'LAIT Seo Ranking',
			startOpen: true,
			placement: ["before", "info"],
			rank: 1,
		}]
	},
	async renderItemFormSidebarPanel(
		sidebarPanelId: string,
		ctx: RenderItemFormSidebarPanelCtx,
	) {
		let apiKey: string  | null = null;
		let seoField: SeoFieldProperties | null = null;
		await (await ctx.loadItemTypeFields(ctx.itemType.id)).forEach((field) => {
			if(field.attributes.field_type === "seo") {
				apiKey = field.attributes.api_key;
			}
		});
		if(apiKey && ctx.formValues[apiKey]) {
			seoField = (ctx.formValues[apiKey] as any)[ctx.locale] as SeoFieldProperties;
			
		}

		if (sidebarPanelId === 'badSeoRanking' ) {
			return render(<SeoChecker ctx={ctx} seoFeld={seoField} />);
		} 
	},

});

