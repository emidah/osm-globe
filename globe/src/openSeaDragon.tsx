import OpenSeaDragon from "openseadragon";
import React, { useEffect, useState, ReactElement } from "react";

let globalViewer = null as (OpenSeaDragon.Viewer | null);

function OpenSeaDragonViewer() : JSX.Element {
        const InitOpenseadragon = () => {
        const viewer =  OpenSeaDragon({
            id: "openSeaDragon",
            prefixUrl: "openseadragon-images/",
            animationTime: 0.5,
            blendTime: 0.1,
            constrainDuringPan: true,
            maxZoomPixelRatio: 2,
            minZoomLevel: 1,
            visibilityRatio: 1,
            zoomPerScroll: 2,
            tileSources:  [{
                type: 'openstreetmaps',
            }],
            crossOriginPolicy: "Anonymous",
            springStiffness: 999
        })
        return viewer;
    };
    useEffect(() => {
        const v = InitOpenseadragon();
        globalViewer = v;
        return () => {
            v && v.destroy();
        };
    }, []);
    return (<div id="openSeaDragon" style={{ height: "800px", width: "800px" }}></div>);
};
export { OpenSeaDragonViewer, globalViewer };