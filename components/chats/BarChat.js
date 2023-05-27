import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import {Dimensions} from 'react-native';

// Get the width of the screen

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
  datasets: [
    {
      data: [20, 45, 28, 80, 100, 43],
    },
  ],
};

const graphStyle = {
  marginVertical: 8,
  borderRadius: 5,
  backgroundColor: '#ffffff',
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 3,
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(1, 3, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 1,
  propsForLabels: {
    fontSize: 11,
  },
};

const BarChat = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <Text
        className="text-black font-bold mt-2 text-[16px]"
        style={styles.customFont}>
        Weekly Sales
      </Text>
      <BarChart
        style={graphStyle}
        data={data}
        width={screenWidth - 20}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});
export default BarChat;
