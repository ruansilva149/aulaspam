import { React, useState } from "react";
import { TextInput, Text, View, TouchableOpacity } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

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
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput 
                    placeholder="Ex.: 1.75" 
                    keyboardType="numeric" 
                    onChangeText={setHeight} 
                    value={height}
                    style={styles.formInput}
                />

                <Text style={styles.formLabel}>Peso</Text>
                <TextInput 
                    placeholder="Ex.: 67.5" 
                    keyboardType="numeric"
                    onChangeText={setWeight} 
                    value={weight}
                    style={styles.formInput}
                />

                <TouchableOpacity
                    title={textButton} 
                    onPress={() => validatorImc()}
                    style={styles.formButton}
                >
                    <Text style={styles.formButtonText}>{textButton}</Text>
                </TouchableOpacity>
            </View>

            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </View>
    );
}
