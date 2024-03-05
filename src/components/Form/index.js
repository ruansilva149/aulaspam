import { React, useState } from "react";
import { TextInput, Text, View, Button } from "react-native";
import ResultImc from "./ResultImc";

export default function Form()
{
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("preencha o peso e a altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("calcular");

    function imcCalculator()
    {
        return setImc((weight/(height*height)).toFixed(2));
    }

    function validatorImc()
    {
        if (weight != null && height != null) {
            imcCalculator()
            setHeight(null);
            setWeight(null);
            setMessageImc("Seu IMC é igual: ")
            setTextButton("Calcular novamente")
            return
        }

        setImc(null)
        setTextButton("Calcular")
        setMessageImc("preencha o peso e a altura")
    }

    return(
        <View>
            <View>
                <Text>Altura</Text>
                <TextInput placeholder="Ex.: 1.75" keyboardType="numeric" onChangeText={setHeight} value={height}/>

                <Text>Peso</Text>
                <TextInput placeholder="Ex.: 67.5" keyboardType="numeric" onChangeText={setWeight} value={weight}/>

                <Button title={textButton} onPress={() => validatorImc()}/>
            </View>

            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </View>
    );
}
