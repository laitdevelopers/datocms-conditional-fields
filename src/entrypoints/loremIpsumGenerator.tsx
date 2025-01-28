import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas, Button } from 'datocms-react-ui';

type PropTypes = {
    ctx: RenderFieldExtensionCtx;
};

export function LoremIpsumGenerator({ ctx }: PropTypes) {
    const test = () => { alert(JSON.stringify(ctx.fields)) }
    return (
        <Canvas ctx={ctx} >
            test
            <Button onClick={test}>OBS </Button>
        </Canvas>
    );
}