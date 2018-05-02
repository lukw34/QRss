import React from 'react';
import {
    ART,
    View,
    Text
} from 'react-native';

const {
    Surface,
    Group,
    Shape,
} = ART;

class DonutGraph extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <View style={{
                flex: 1
            }}
            >
                <Surface width={500} height={500}>
                    <Group>
                        <Shape
                            d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
                            stroke="#000"
                            strokeWidth={1}
                        />
                    </Group>
                </Surface>
            </View>
        );

    }
}

export default DonutGraph;