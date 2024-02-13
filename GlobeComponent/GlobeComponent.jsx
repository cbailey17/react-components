import React from 'react'
import Globe from 'https://cdn.jsdelivr.net/npm/globe.gl@2.29.0/+esm';


const GlobeComponent = () => {
    const globeVizRef = useRef(null);
    
    useEffect(() => {
        const globeData = [];
        const travelFolder = app.vault.getAbstractFileByPath("Travel").children;
        
        console.log("Travel folder");
        console.log(travelFolder);
        
        travelFolder.forEach((file) => {
            const cachedFm = app.metadataCache.getCache(file.path);
    
            globeData.push({
                lat: cachedFm.frontmatter.Location[1].Latitude,
                lng: cachedFm.frontmatter.Location[0].Longitude,
                size: cachedFm.frontmatter.Rating * 10,
                color: ['red', 'white', 'blue', 'green'][Math.floor(Math.random() * 4)]
            });
        });
      
        const markerSvg = `<svg viewBox="-4 0 36 36">
            <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
            <circle fill="black" cx="14" cy="14" r="7"></circle>
            </svg>`;
    
        if (globeVizRef.current) {
            if (app.isMobile) {
                globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
                    .backgroundColor('rgba(0,0,0,0)')
                    .width(300)
                    .height(300)
                    .htmlLat('lat')
                    .htmlLng('lng')
                    .htmlElementsData(globeData)
                    .htmlElement(d => htmlElementFunction(d, markerSvg))
            } else {
                Globe()
                    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
                    .backgroundColor('rgba(0,0,0,0)')
                    .width(1000)
                    .height(1000)
                    .htmlLat('lat')
                    .htmlLng('lng')
                    .htmlElementsData(globeData)
                    .htmlElement(d => htmlElementFunction(d, markerSvg))
                (globeVizRef.current);
                
            }
        }
    }, []);
    
    function htmlElementFunction(d, markerSvg) {
        const el = document.createElement('div');
        el.style.zIndex = 1000;
        el.innerHTML = markerSvg;
        el.style.color = d.color;
        el.style.width = `${d.size}px`;
        el.style['pointer-events'] = 'auto';
        el.style.cursor = 'pointer';

        const tooltip = document.createElement('div');
        tooltip.style.position = 'absolute';
        tooltip.style.background = '#303445';
        tooltip.style.border = '1px solid #333';
        tooltip.style.padding = '6px';
        tooltip.style.borderRadius = '14px';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.display = 'none';
        tooltip.style.bottom = '100%';
        tooltip.style.transform = 'translate(-5px)';
        el.appendChild(tooltip);
        el.addEventListener('mouseover', () => {
        tooltip.innerHTML = `
            Lat: ${d.lat}<br>
            Lng: ${d.lng}<br>
            Color: ${d.color}<br>
            Size: ${d.size}
        `;
        tooltip.style.display = 'block';
        });
        el.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });
        
        return el;
    }
    
    return <div ref={globeVizRef}></div>;    
}

export default GlobeComponent