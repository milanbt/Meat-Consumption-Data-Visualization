import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, 
    LineSeries, DiscreteColorLegend, Crosshair} from 'react-vis';

function hslToHex(h, s, l) {
    h /= 360;
    s /= 255;
    l /= 255;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } 
    else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
const series = [];
const invisiSeries = [];
const seriesColor = [];
const Chart = (props) => {

    const [crossVals, setCrossVals] = React.useState([]);
    const dataArr = [];

    for (var i = 0; i < props.data.length; i++) {
        dataArr.push(props.data[i].map((d)=> {
            return {x: d.TIME, y: d.Value};
        }));
    }

    for (i = 0; i < dataArr.length; i++) {
        if (seriesColor.length <= i) {
            seriesColor.push(hslToHex( (i * 360 * 3/10) % 360, 255, 128));
        }
        series.push(<LineSeries
            data={dataArr[i]}
            style={{stroke: seriesColor[i], strokeWidth: 3}}
            onNearestX={v => {
                setCrossVals([v]);
            }}/>);
        /*invisiSeries.push(<LineSeries
            data={dataArr[i]}
            style={{opacity: 0, strokeWidth: 10}}
            onNearestX={v => {
                setCrossVals([v]);
            }}/>);
            */
    }
    return (
        <div>
            <XYPlot
                xType="ordinal"
                width={1000}
                height={500}
                onMouseLeave={() => {setCrossVals([])}}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Year" tickLabelAngle={35} tickPadding={24}/>
                <YAxis title="KG per Capita" />
                    {series}
                <Crosshair values={crossVals}>
                </Crosshair>
            </XYPlot>
            <DiscreteColorLegend height={200} width={300} 
                items={props.items.map(e => {
                    return {title: e.LOCATION + ' ' + e.SUBJECT,
                    color: seriesColor[e.INDEX],
                    strokeWidth: 3}})} />
        </div>
    );
}
export default Chart;
