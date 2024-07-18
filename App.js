import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const Result = () => {

  const [desiredWeight, setDesiredWeight] = useState('')
  const [plateDistribution, setPlateDistribution] = useState([])
  const [plateQuantities, setPlateQuantities] = useState({

    45: { quantity: 50, used: 0 },
    35: { quantity: 10, used: 0 },
    25: { quantity: 10, used: 0 },
    10: { quantity: 10, used: 0 }, 
    5: { quantity: 10, used: 0 },
    2.5: { quantity: 10, used: 0 },

  });

const calculateWeight = (num) => {
  const availableValues =  [45, 35, 25, 10, 5, 2.5]
  let minusBar = num - 45
  let timesMultiplied = [
    [45, 0],
    [35, 0],
    [25, 0],
    [10, 0],
    [5, 0],
    [2.5, 0]
  ];
  
  const currentQuantities = { ...plateQuantities };


  availableValues.forEach((plate, index) => {
    let maxPlatesPerSide = currentQuantities[plate].quantity / 2
    let requiredPlatesPerSide = Math.trunc((minusBar / 2) / plate)
    let usedPlatesPerSide = Math.min(maxPlatesPerSide, requiredPlatesPerSide)
    
    currentQuantities[plate].quantity -= usedPlatesPerSide * 2;
    minusBar -= usedPlatesPerSide * plate * 2
    timesMultiplied[index][1] = usedPlatesPerSide    
  })

  return timesMultiplied;

}

const adjustPlateQuantity = (plate, adjustment) => {
  setPlateQuantities((prevQuantities) => {
    const newQuantity = Math.max(0, prevQuantities[plate].quantity + adjustment);
    return {
      ...prevQuantities,
      [plate]: {
        ...prevQuantities[plate],
        quantity: newQuantity,
        used: 0,
      },
    };
  });
};


const handleCalculate = () => {
  if (!desiredWeight) return;

  const result = calculateWeight(parseFloat(desiredWeight))
  setPlateDistribution(result)
}

return (
    <View className="items-center gap-y-2" >
    {/* block w-[300] text-center text-lg bg-black rounded-full 
    border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300
     placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 */}
     <Text className="text-2xl text-center" >Plate Calculator</Text>
    <TextInput 
    className="block w-[300] rounded-full bg-gray-200 border-0 px-4 py-1.5 placeholder:text-black  text-black shadow-sm ring-1 ring-inset ring-gray-950  focus:ring-2 focus:ring-inset focus:ring-indigo-600"
    value={desiredWeight}
    onChangeText={setDesiredWeight}
    placeholder='Enter desired weight'
    keyboardType='numeric'
    onSubmitEditing={handleCalculate}
    />
    {/* <Pressable onPress={handleCalculate} >
      <Text>Calculate</Text>
    </Pressable>  */}
    <View className="gap-1 justify-center items-center" >
    <Text className="text-xl" style={"fontFamily: 'Inter'"} >
      Plates Available
    </Text>
      {Object.keys(plateQuantities).map(Number)
      .sort((a, b) => b - a)
      .map((plate, index) => (
        <View className="gap-y-1 flex-row justify-center items-center" key={index}>
        <View className="flex-row items-center gap-x-2" >

          <Pressable className="w-[45] items-center rounded-lg justify-center h-[45]  bg-black" onPress={() => adjustPlateQuantity(plate, -1)} >
          <Text className="text-white text-2xl" >--</Text>
          </Pressable>
       {/* w-[50] h-[50] items-center justify-center text-center rounded-lg bg-black text-white text-lg */}
          <Text className="text-xl w-[120] text-center" >{`${plate} lbs: ${plateQuantities[plate].quantity}`}</Text>

          <Pressable className="w-[45] items-center rounded-lg justify-center h-[45]  bg-black" onPress={() => adjustPlateQuantity(plate, 1)} >
            <Text className=" text-white text-2xl" >+</Text>
          </Pressable>
        </View>

        </View>
      ))}
    </View>  

    <View className="justify-center items-center gap-1" >
    <Text className="text-2xl" >Result</Text>
      {plateDistribution.map(([plateWeight, count], index) => (
        count > 0 && (
        <View className="bg-black w-[200] h-[50] items-center justify-center rounded-lg" >
        <Text className="text-lg text-white" key={index.toString()}>
        {console.log(index)}
        {count == 1 ? `${count} ${plateWeight}lb plate` : `${count} ${plateWeight}lb plates`}
        </Text>
        </View>
        )
      ))}
    </View>  
    </View>
    
)
}

export default function App() {

    return (
    <View className="" >
      <View className="flex items-center justify-center h-screen" >
      <Result />
      <StatusBar style="auto" />
    </View>
    </View>
  );
}