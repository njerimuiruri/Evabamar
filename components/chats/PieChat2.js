import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
const data = [
  {
    name: 'Monday',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 10,
  },
  {
    name: 'Tuesday',
    population: 2800000,
    color: 'green',
    legendFontColor: '#7F7F7F',
    legendFontSize: 10,
  },
  {
    name: 'Wednesday',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 10,
  },
  {
    name: 'Thursday',
    population: 8538000,
    color: 'gold',
    legendFontColor: '#7F7F7F',
    legendFontSize: 10,
  },
  {
    name: 'Friday',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 10,
  },
  {
    name: 'Saturday',
    population: 1100000,
    color: 'purple',
    legendFontColor: '#7F7F7F',
    legendFontSize: 10,
  },
];

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const PieChat2 = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'10'}
        center={[10, 10]}
        // absolute
      />
    </View>
  );
};

export default PieChat2;
