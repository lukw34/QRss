import React from 'react';
import {
    ART
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
        data: PropTypes.arrayOf(PropTypes.shape({}))
    };

    state = {
        paths: []
    };

    componentDidMount() {
        this.generateGraph();
    }

    generateGraph = () => {
        const {data} = this.props;
        const paths = pie()
            .value(({value}) => value)
            .sort(null)
            .padAngle(.03)(data);
        this.setState({
            paths
        });
    };

    width = 150;
    height = 150;
    arcPath = arc().outerRadius(this.width / 2).innerRadius(this.width / 3);

    color = scaleOrdinal(schemeCategory10);

    render() {
        const {paths} = this.state;
        return (
            <Surface style={{display: 'flex', position: 'relative'}} width={this.width} height={this.height}>
                <Group x={75} y={75}>
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
        );

    }
}

export default DonutGraph;