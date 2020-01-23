import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

/*class Chart extends React.Component {
    render() {
        return (
            <XYPlot
                xType="ordinal"
                width={500}
                height={500}
                margin={{
                    left: 70
                }}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries
                    data={[{x:1, y:2},
                            {x:2, y:4},
                            {x:3, y:1}]}
                    style={{stroke: 'blue', strokeWidth: 3}} 
                    />
            </XYPlot>
        );
    }
}*/
function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
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
const seriesColor = [];
const Chart = (props) => {

    const dataArr = [];
    for (var i = 0; i < props.data.length; i++) {
        dataArr.push(props.data[i].map((d)=> {
            return {x: d.TIME, y: d.Value};
        }));
    }
    let numSeries = dataArr.length;

    for (i = 0; i < dataArr.length; i++) {
        if (seriesColor.length <= i) {
            seriesColor.push(hslToHex((((i%3) * numSeries/3)+(i/2)) * 255.0 / numSeries, 255, 128));
        }
        series.push(<LineSeries
        data={dataArr[i]}
        style={{stroke: seriesColor[i], strokeWidth: 3}}/>);
    }
    
    /*const dataArr = props.data.map((e)=> {
        e.map((d)=>
            return {x: d.TIME, 
            y: d.Value};
        )
    });*/

    return (
        <XYPlot
            xType="ordinal"
            width={1000}
            height={500}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Year" tickLabelAngle={35} tickPadding={24}/>
            <YAxis title="KG per Capita" />
                {series}
        </XYPlot>
    );
}
export default Chart;
