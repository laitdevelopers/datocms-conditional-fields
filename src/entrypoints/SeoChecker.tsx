import { RenderItemFormSidebarPanelCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import { SeoFieldProperties, SEOHealthCheck } from '../interfaces/Seo';
import "./seoChecker.css";

type PropTypes = {
  ctx: RenderItemFormSidebarPanelCtx;
  seoFeld: SeoFieldProperties | null;
};

export function SeoChecker({ ctx, seoFeld }: PropTypes) {
    if(!seoFeld) {
        return;
    }
    const titleScore = checkTitle(seoFeld.title);
    const descriptionScore = checkDescription(seoFeld.description);
    const imageScore = checkImage(seoFeld.image);

  return (
    <Canvas ctx={ctx}>
      <div className="seo-checker-item">
            <h3>Title</h3>
            <span  className={`seo-checker-bar `}>
                <span className={`seo-checker-bar-child seo-checker-bar-child--${titleScore.status}`} style={
                    {
                        width: `${titleScore.score}%`,
                    }
                }>
                </span>
            </span>
            {titleScore.score < 100 ? (<p className='text-for-bar'>The title is empty or the title is not between 20 and 60 charactors</p>) : (<p>Great! Score!</p>)}
      </div>
      <div className="seo-checker-item">
            <h3>Description</h3>
            <span  className={`seo-checker-bar `}>
                <span className={`seo-checker-bar-child seo-checker-bar-child--${descriptionScore.status}`} style={
                    {
                        width: `${descriptionScore.score}%`,
                    }
                }>
                </span>
            </span>
            {descriptionScore.score < 100 ? (<p className='text-for-bar'>The description is empty or the description is not between 120 and 160 charactors</p>) : (<p>Great! Score!</p>)}
      </div>
      <div className="seo-checker-item">
            <h3>Image</h3>
            <span  className={`seo-checker-bar `}>
                <span className={`seo-checker-bar-child seo-checker-bar-child--${imageScore.status}`} style={
                    {
                        width: `${imageScore.score}%`,
                    }
                }>
                </span>
            </span>
            {imageScore.score < 100 ? (<p className='text-for-bar'>The image is missing</p>) : (<p>Great! Score!</p>)}
      </div>
    </Canvas>
  );
}

function checkTitle(title: string | null): SEOHealthCheck {
    if (!title || title.trim() === "") {
        return { score: 20, status: 'red' };
    }

    const length = title.length;
    if (length >= 20 && length <= 60) {
        return { score: 100, status: 'green' };
    } else {
        return { score: 70, status: 'yellow' };
    }
}

function checkDescription(description: string | null): SEOHealthCheck {
    if (!description || description.trim() === "") {
        return { score: 20, status: 'red' };
    }

    const length = description.length;
    if (length >= 120 && length <= 160) {
        return { score: 100, status: 'green' };
    } else {
        return { score: 70, status: 'yellow' };
    }
}

function checkImage(image: string | null): SEOHealthCheck {
    if (!image) {
        return { score: 20, status: 'red' };
    } else {
        return { score: 100, status: 'green' };
    }
}