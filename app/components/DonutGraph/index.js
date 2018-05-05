import React from 'react';
import {
    ART,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import {pie, arc} from 'd3-shape';
import {scaleOrdinal} from 'd3-scale';
import {schemeCategory10} from 'd3-scale-chromatic';

const {
    Surface,
    Group,
    Shape,
    Text
} = ART;

class DonutGraph extends React.Component {
    static propTypes = {
        style: View.propTypes.style
    };

    static getDerivedStateFromProps({data}) {
        const paths = pie()
            .value(({value}) => value)
            .sort(null)
            .padAngle(.03)(data);
        return {paths};
    }

    state = {
        paths: []
    };

    width = 150;
    height = 150;
    arcPath = arc().outerRadius(this.width / 2).innerRadius(this.width / 5);
    color = scaleOrdinal(schemeCategory10);

    render() {
        const {paths} = this.state;
        const {style} = this.props;
        return (
            <View style={style}>
                <Surface style={{display: 'flex', position: 'relative'}} width={this.width} height={this.height}>
                    <Group x={this.width / 2} y={this.height / 2}>
                        {paths.map((d, index) => {
                            const [x, y] = this.arcPath.centroid(d);
                            const fill = this.color(d.data.name);
                            return [
                                <Shape
                                    key={`shape-${index}`}
                                    d={this.arcPath(d)}
                                    stroke={fill}
                                    fill={fill}
                                    strokeWidth={1}
                                />,
                                <Text
                                    key={`text-${index}`}
                                    x={x}
                                    y={y}
                                    fill='white'
                                    font={{
                                        fontFamily: 'Helvetica, Neue Helvetica, Arial',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        fontStyle: 'normal'
                                    }}
                                >
                                    {d.value.toString()}
                                </Text>
                            ];
                        })}
                    </Group>
                </Surface>
            </View>
        );

    }
}

export default DonutGraph;