import type { RenderConfigScreenCtx, } from 'datocms-plugin-sdk';
import { Canvas, SwitchField } from 'datocms-react-ui';
import s from './styles.module.css';

type Props = {
  ctx: RenderConfigScreenCtx;
};

type ValidParameters = { seoChecker: boolean };

type Parameters = {
  [k: string]: unknown;
} | ValidParameters;

export default function ConfigScreen({ ctx }: Props) {
  const parameters: Parameters = ctx.plugin.attributes.parameters;
  return (
    <Canvas ctx={ctx}>
      <p>Welcome to LAIT extension pack!</p>
      <p>Select which plugins you want to enable</p>

      <div className={s.inspector}>
        <SwitchField  id="setSEOplugin" name="setSeoPlugin" label="Enable Seo checker" value={parameters.seoChecker as boolean}  onChange={(newValue) => {
          ctx.updatePluginParameters({ seoChecker: newValue });
          newValue === true ? ctx.notice('Seo checker added!') : ctx.notice('Seo checker removed!');
          
        }}></SwitchField>
      </div>
    </Canvas>
  );
}
