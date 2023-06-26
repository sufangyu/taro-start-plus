import { View, Button, Text } from '@tarojs/components';

interface Props {
  count: number;
  onMinus?: () => void;
}

const Index = (props: Props) => {
  const { count, onMinus } = props;

  return (
    <View>
      <View>
        <Text>Props: {count}</Text>
        <Button
          size='mini'
          onClick={() => {
            onMinus && onMinus();
          }}
        >累减</Button>
        
      </View>
    </View>
  );
};

export default Index;
